package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestBoxEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Box(nil)
		if ent == nil {
			t.Fatal("expected non-nil BoxEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := boxBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "box." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENSENSEMAP_TEST_BOX_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		boxRef01Ent := client.Box(nil)
		boxRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "box"}, setup.data), "box_ref01"))
		boxRef01Data["box_id"] = setup.idmap["box01"]
		boxRef01Data["sensor_id"] = setup.idmap["sensor01"]

		boxRef01DataResult, err := boxRef01Ent.Create(boxRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		boxRef01Data = core.ToMapAny(boxRef01DataResult)
		if boxRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if boxRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		boxRef01Match := map[string]any{}

		boxRef01ListResult, err := boxRef01Ent.List(boxRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		boxRef01List, boxRef01ListOk := boxRef01ListResult.([]any)
		if !boxRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", boxRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(boxRef01List), map[string]any{"id": boxRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		boxRef01DataUp0Up := map[string]any{
			"id": boxRef01Data["id"],
		}

		boxRef01MarkdefUp0Name := "created_at"
		boxRef01MarkdefUp0Value := fmt.Sprintf("Mark01-box_ref01_%d", setup.now)
		boxRef01DataUp0Up[boxRef01MarkdefUp0Name] = boxRef01MarkdefUp0Value

		boxRef01ResdataUp0Result, err := boxRef01Ent.Update(boxRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		boxRef01ResdataUp0 := core.ToMapAny(boxRef01ResdataUp0Result)
		if boxRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if boxRef01ResdataUp0["id"] != boxRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if boxRef01ResdataUp0[boxRef01MarkdefUp0Name] != boxRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", boxRef01MarkdefUp0Name, boxRef01ResdataUp0[boxRef01MarkdefUp0Name])
		}

		// LOAD
		boxRef01MatchDt0 := map[string]any{
			"id": boxRef01Data["id"],
		}
		boxRef01DataDt0Loaded, err := boxRef01Ent.Load(boxRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		boxRef01DataDt0LoadResult := core.ToMapAny(boxRef01DataDt0Loaded)
		if boxRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if boxRef01DataDt0LoadResult["id"] != boxRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		boxRef01MatchRm0 := map[string]any{
			"id": boxRef01Data["id"],
		}
		_, err = boxRef01Ent.Remove(boxRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		boxRef01MatchRt0 := map[string]any{}

		boxRef01ListRt0Result, err := boxRef01Ent.List(boxRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		boxRef01ListRt0, boxRef01ListRt0Ok := boxRef01ListRt0Result.([]any)
		if !boxRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", boxRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(boxRef01ListRt0), map[string]any{"id": boxRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func boxBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "box", "BoxTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read box test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse box test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"box01", "box02", "box03", "sensor01"},
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
	entidEnvRaw := os.Getenv("OPENSENSEMAP_TEST_BOX_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENSENSEMAP_TEST_BOX_ENTID": idmap,
		"OPENSENSEMAP_TEST_LIVE":      "FALSE",
		"OPENSENSEMAP_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["OPENSENSEMAP_TEST_BOX_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENSENSEMAP_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
