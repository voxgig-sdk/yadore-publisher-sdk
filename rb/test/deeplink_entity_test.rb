# Deeplink entity test

require "minitest/autorun"
require "json"
require_relative "../YadorePublisher_sdk"
require_relative "runner"

class DeeplinkEntityTest < Minitest::Test
  def test_create_instance
    testsdk = YadorePublisherSDK.test(nil, nil)
    ent = testsdk.Deeplink(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = deeplink_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "deeplink." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set YADOREPUBLISHER_TEST_DEEPLINK_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    deeplink_ref01_ent = client.Deeplink(nil)
    deeplink_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.deeplink"), "deeplink_ref01"))

    deeplink_ref01_data_result = deeplink_ref01_ent.create(deeplink_ref01_data, nil)
    deeplink_ref01_data = Helpers.to_map(deeplink_ref01_data_result)
    assert !deeplink_ref01_data.nil?

  end
end

def deeplink_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "deeplink", "DeeplinkTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = YadorePublisherSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["deeplink01", "deeplink02", "deeplink03"],
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
  entid_env_raw = ENV["YADOREPUBLISHER_TEST_DEEPLINK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "YADOREPUBLISHER_TEST_DEEPLINK_ENTID" => idmap,
    "YADOREPUBLISHER_TEST_LIVE" => "FALSE",
    "YADOREPUBLISHER_TEST_EXPLAIN" => "FALSE",
    "YADOREPUBLISHER_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["YADOREPUBLISHER_TEST_DEEPLINK_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["YADOREPUBLISHER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["YADOREPUBLISHER_APIKEY"],
      },
      extra || {},
    ])
    client = YadorePublisherSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["YADOREPUBLISHER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["YADOREPUBLISHER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
