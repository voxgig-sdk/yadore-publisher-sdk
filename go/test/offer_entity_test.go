package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/yadore-publisher-sdk/go"
	"github.com/voxgig-sdk/yadore-publisher-sdk/go/core"

	vs "github.com/voxgig-sdk/yadore-publisher-sdk/go/utility/struct"
)

func TestOfferEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Offer(nil)
		if ent == nil {
			t.Fatal("expected non-nil OfferEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := offerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "offer." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set YADOREPUBLISHER_TEST_OFFER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		offerRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.offer", setup.data)))
		var offerRef01Data map[string]any
		if len(offerRef01DataRaw) > 0 {
			offerRef01Data = core.ToMapAny(offerRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = offerRef01Data

		// LIST
		offerRef01Ent := client.Offer(nil)
		offerRef01Match := map[string]any{}

		offerRef01ListResult, err := offerRef01Ent.List(offerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, offerRef01ListOk := offerRef01ListResult.([]any)
		if !offerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", offerRef01ListResult)
		}

		// LOAD
		offerRef01MatchDt0 := map[string]any{
			"id": offerRef01Data["id"],
		}
		offerRef01DataDt0Loaded, err := offerRef01Ent.Load(offerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		offerRef01DataDt0LoadResult := core.ToMapAny(offerRef01DataDt0Loaded)
		if offerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if offerRef01DataDt0LoadResult["id"] != offerRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func offerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "offer", "OfferTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read offer test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse offer test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"offer01", "offer02", "offer03"},
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
	entidEnvRaw := os.Getenv("YADOREPUBLISHER_TEST_OFFER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"YADOREPUBLISHER_TEST_OFFER_ENTID": idmap,
		"YADOREPUBLISHER_TEST_LIVE":      "FALSE",
		"YADOREPUBLISHER_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["YADOREPUBLISHER_TEST_OFFER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["YADOREPUBLISHER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
