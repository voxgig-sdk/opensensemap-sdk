package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/opensensemap-sdk/go"
	"github.com/voxgig-sdk/opensensemap-sdk/go/core"

	vs "github.com/voxgig-sdk/opensensemap-sdk/go/utility/struct"
)

func TestMeasurementEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Measurement(nil)
		if ent == nil {
			t.Fatal("expected non-nil MeasurementEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := measurementBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "measurement." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENSENSEMAP_TEST_MEASUREMENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		measurementRef01Ent := client.Measurement(nil)
		measurementRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "measurement"}, setup.data), "measurement_ref01"))
		measurementRef01Data["box_id"] = setup.idmap["box01"]

		measurementRef01DataResult, err := measurementRef01Ent.Create(measurementRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		measurementRef01Data = core.ToMapAny(measurementRef01DataResult)
		if measurementRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func measurementBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "measurement", "MeasurementTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read measurement test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse measurement test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"measurement01", "measurement02", "measurement03", "box01", "box02", "box03"},
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
	entidEnvRaw := os.Getenv("OPENSENSEMAP_TEST_MEASUREMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENSENSEMAP_TEST_MEASUREMENT_ENTID": idmap,
		"OPENSENSEMAP_TEST_LIVE":      "FALSE",
		"OPENSENSEMAP_TEST_EXPLAIN":   "FALSE",
		"OPENSENSEMAP_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENSENSEMAP_TEST_MEASUREMENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENSENSEMAP_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OPENSENSEMAP_APIKEY"],
			},
			extra,
		})
		client = sdk.NewOpensensemapSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENSENSEMAP_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENSENSEMAP_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
