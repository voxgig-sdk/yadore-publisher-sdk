<?php
declare(strict_types=1);

// ReportStatus entity test

require_once __DIR__ . '/../yadorepublisher_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ReportStatusEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = YadorePublisherSDK::test(null, null);
        $ent = $testsdk->ReportStatus(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = report_status_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "report_status." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set YADOREPUBLISHER_TEST_REPORT_STATUS_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $report_status_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.report_status")));
        $report_status_ref01_data = null;
        if (count($report_status_ref01_data_raw) > 0) {
            $report_status_ref01_data = Helpers::to_map($report_status_ref01_data_raw[0][1]);
        }

        // LOAD
        $report_status_ref01_ent = $client->ReportStatus(null);
        $report_status_ref01_match_dt0 = [];
        $report_status_ref01_data_dt0_loaded = $report_status_ref01_ent->load($report_status_ref01_match_dt0, null);
        $this->assertNotNull($report_status_ref01_data_dt0_loaded);

    }
}

function report_status_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/report_status/ReportStatusTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = YadorePublisherSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["report_status01", "report_status02", "report_status03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("YADOREPUBLISHER_TEST_REPORT_STATUS_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "YADOREPUBLISHER_TEST_REPORT_STATUS_ENTID" => $idmap,
        "YADOREPUBLISHER_TEST_LIVE" => "FALSE",
        "YADOREPUBLISHER_TEST_EXPLAIN" => "FALSE",
        "YADOREPUBLISHER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["YADOREPUBLISHER_TEST_REPORT_STATUS_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["YADOREPUBLISHER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["YADOREPUBLISHER_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new YadorePublisherSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["YADOREPUBLISHER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["YADOREPUBLISHER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
