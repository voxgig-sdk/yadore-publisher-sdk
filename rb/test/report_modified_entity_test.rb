# ReportModified entity test

require "minitest/autorun"
require "json"
require_relative "../YadorePublisher_sdk"
require_relative "runner"

class ReportModifiedEntityTest < Minitest::Test
  def test_create_instance
    testsdk = YadorePublisherSDK.test(nil, nil)
    ent = testsdk.ReportModified(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = report_modified_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "report_modified." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set YADORE_PUBLISHER_TEST_REPORT_MODIFIED_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    report_modified_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.report_modified")))
    report_modified_ref01_data = nil
    if report_modified_ref01_data_raw.length > 0
      report_modified_ref01_data = Helpers.to_map(report_modified_ref01_data_raw[0][1])
    end

    # LOAD
    report_modified_ref01_ent = client.ReportModified(nil)
    report_modified_ref01_match_dt0 = {}
    report_modified_ref01_data_dt0_loaded = report_modified_ref01_ent.load(report_modified_ref01_match_dt0, nil)
    assert !report_modified_ref01_data_dt0_loaded.nil?

  end
end

def report_modified_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "report_modified", "ReportModifiedTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = YadorePublisherSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["report_modified01", "report_modified02", "report_modified03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["YADORE_PUBLISHER_TEST_REPORT_MODIFIED_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "YADORE_PUBLISHER_TEST_REPORT_MODIFIED_ENTID" => idmap,
    "YADORE_PUBLISHER_TEST_LIVE" => "FALSE",
    "YADORE_PUBLISHER_TEST_EXPLAIN" => "FALSE",
    "YADORE_PUBLISHER_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["YADORE_PUBLISHER_TEST_REPORT_MODIFIED_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["YADORE_PUBLISHER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["YADORE_PUBLISHER_APIKEY"],
      },
      extra || {},
    ])
    client = YadorePublisherSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["YADORE_PUBLISHER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["YADORE_PUBLISHER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
