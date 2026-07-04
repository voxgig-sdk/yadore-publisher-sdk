<?php
declare(strict_types=1);

// Merchant entity test

require_once __DIR__ . '/../yadorepublisher_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MerchantEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = YadorePublisherSDK::test(null, null);
        $ent = $testsdk->Merchant(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = merchant_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "merchant." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set YADOREPUBLISHER_TEST_MERCHANT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $merchant_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.merchant")));
        $merchant_ref01_data = null;
        if (count($merchant_ref01_data_raw) > 0) {
            $merchant_ref01_data = Helpers::to_map($merchant_ref01_data_raw[0][1]);
        }

        // LIST
        $merchant_ref01_ent = $client->Merchant(null);
        $merchant_ref01_match = [];

        $merchant_ref01_list_result = $merchant_ref01_ent->list($merchant_ref01_match, null);
        $this->assertIsArray($merchant_ref01_list_result);

    }
}

function merchant_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/merchant/MerchantTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = YadorePublisherSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["merchant01", "merchant02", "merchant03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("YADOREPUBLISHER_TEST_MERCHANT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "YADOREPUBLISHER_TEST_MERCHANT_ENTID" => $idmap,
        "YADOREPUBLISHER_TEST_LIVE" => "FALSE",
        "YADOREPUBLISHER_TEST_EXPLAIN" => "FALSE",
        "YADOREPUBLISHER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["YADOREPUBLISHER_TEST_MERCHANT_ENTID"]);
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
