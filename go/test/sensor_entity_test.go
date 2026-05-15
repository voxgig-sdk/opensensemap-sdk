package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/opensensemap-sdk"
	"github.com/voxgig-sdk/opensensemap-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestSensorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Sensor(nil)
		if ent == nil {
			t.Fatal("expected non-nil SensorEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := sensorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "sensor." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENSENSEMAP_TEST_SENSOR_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		sensorRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.sensor", setup.data)))
		var sensorRef01Data map[string]any
		if len(sensorRef01DataRaw) > 0 {
			sensorRef01Data = core.ToMapAny(sensorRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = sensorRef01Data

		// LIST
		sensorRef01Ent := client.Sensor(nil)
		sensorRef01Match := map[string]any{
			"box_id": setup.idmap["box01"],
		}

		sensorRef01ListResult, err := sensorRef01Ent.List(sensorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, sensorRef01ListOk := sensorRef01ListResult.([]any)
		if !sensorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", sensorRef01ListResult)
		}

	})
}

func sensorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "sensor", "SensorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read sensor test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse sensor test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"sensor01", "sensor02", "sensor03", "box01", "box02", "box03"},
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
	entidEnvRaw := os.Getenv("OPENSENSEMAP_TEST_SENSOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENSENSEMAP_TEST_SENSOR_ENTID": idmap,
		"OPENSENSEMAP_TEST_LIVE":      "FALSE",
		"OPENSENSEMAP_TEST_EXPLAIN":   "FALSE",
		"OPENSENSEMAP_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENSENSEMAP_TEST_SENSOR_ENTID"])
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
