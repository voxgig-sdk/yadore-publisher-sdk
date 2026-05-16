package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/yadore-publisher-sdk"
	"github.com/voxgig-sdk/yadore-publisher-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestMerchantEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Merchant(nil)
		if ent == nil {
			t.Fatal("expected non-nil MerchantEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := merchantBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "merchant." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set YADOREPUBLISHER_TEST_MERCHANT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		merchantRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.merchant", setup.data)))
		var merchantRef01Data map[string]any
		if len(merchantRef01DataRaw) > 0 {
			merchantRef01Data = core.ToMapAny(merchantRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = merchantRef01Data

		// LIST
		merchantRef01Ent := client.Merchant(nil)
		merchantRef01Match := map[string]any{}

		merchantRef01ListResult, err := merchantRef01Ent.List(merchantRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, merchantRef01ListOk := merchantRef01ListResult.([]any)
		if !merchantRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", merchantRef01ListResult)
		}

	})
}

func merchantBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "merchant", "MerchantTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read merchant test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse merchant test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"merchant01", "merchant02", "merchant03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("YADOREPUBLISHER_TEST_MERCHANT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"YADOREPUBLISHER_TEST_MERCHANT_ENTID": idmap,
		"YADOREPUBLISHER_TEST_LIVE":      "FALSE",
		"YADOREPUBLISHER_TEST_EXPLAIN":   "FALSE",
		"YADOREPUBLISHER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["YADOREPUBLISHER_TEST_MERCHANT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["YADOREPUBLISHER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["YADOREPUBLISHER_APIKEY"],
			},
			extra,
		})
		client = sdk.NewYadorePublisherSDK(core.ToMapAny(mergedOpts))
	}

	live := env["YADOREPUBLISHER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["YADOREPUBLISHER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
