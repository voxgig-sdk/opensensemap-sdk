<?php
declare(strict_types=1);

// Box entity test

require_once __DIR__ . '/../opensensemap_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BoxEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OpensensemapSDK::test(null, null);
        $ent = $testsdk->Box(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "box" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = OpensensemapSDK::test($seed, null);
        $seen = iterator_to_array($base->Box(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = OpensensemapConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = OpensensemapSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Box(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = box_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "box." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OPENSENSEMAP_TEST_BOX_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $box_ref01_ent = $client->Box(null);
        $box_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.box"), "box_ref01"));
        $box_ref01_data["box_id"] = $setup["idmap"]["box01"];
        $box_ref01_data["sensor_id"] = $setup["idmap"]["sensor01"];

        $box_ref01_data_result = $box_ref01_ent->create($box_ref01_data, null);
        $box_ref01_data = Helpers::to_map(is_object($box_ref01_data_result) && method_exists($box_ref01_data_result, 'data_get') ? $box_ref01_data_result->data_get() : $box_ref01_data_result);
        $this->assertNotNull($box_ref01_data);
        $this->assertNotNull($box_ref01_data["id"]);

        // LIST
        $box_ref01_match = [];

        $box_ref01_list_result = $box_ref01_ent->list($box_ref01_match, null);
        $this->assertIsArray($box_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($box_ref01_list_result),
            ["id" => $box_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $box_ref01_data_up0_up = [
            "id" => $box_ref01_data["id"],
        ];

        $box_ref01_markdef_up0_name = "createdAt";
        $box_ref01_markdef_up0_value = "Mark01-box_ref01_" . $setup["now"];
        $box_ref01_data_up0_up[$box_ref01_markdef_up0_name] = $box_ref01_markdef_up0_value;

        $box_ref01_resdata_up0_result = $box_ref01_ent->update($box_ref01_data_up0_up, null);
        $box_ref01_resdata_up0 = Helpers::to_map(is_object($box_ref01_resdata_up0_result) && method_exists($box_ref01_resdata_up0_result, 'data_get') ? $box_ref01_resdata_up0_result->data_get() : $box_ref01_resdata_up0_result);
        $this->assertNotNull($box_ref01_resdata_up0);
        $this->assertEquals($box_ref01_resdata_up0["id"], $box_ref01_data_up0_up["id"]);
        $this->assertEquals($box_ref01_resdata_up0[$box_ref01_markdef_up0_name], $box_ref01_markdef_up0_value);

        // LOAD
        $box_ref01_match_dt0 = [
            "id" => $box_ref01_data["id"],
        ];
        $box_ref01_data_dt0_loaded = $box_ref01_ent->load($box_ref01_match_dt0, null);
        $box_ref01_data_dt0_load_result = Helpers::to_map(is_object($box_ref01_data_dt0_loaded) && method_exists($box_ref01_data_dt0_loaded, 'data_get') ? $box_ref01_data_dt0_loaded->data_get() : $box_ref01_data_dt0_loaded);
        $this->assertNotNull($box_ref01_data_dt0_load_result);
        $this->assertEquals($box_ref01_data_dt0_load_result["id"], $box_ref01_data["id"]);

        // REMOVE
        $box_ref01_match_rm0 = [
            "id" => $box_ref01_data["id"],
        ];
        $box_ref01_ent->remove($box_ref01_match_rm0, null);

        // LIST
        $box_ref01_match_rt0 = [];

        $box_ref01_list_rt0_result = $box_ref01_ent->list($box_ref01_match_rt0, null);
        $this->assertIsArray($box_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($box_ref01_list_rt0_result),
            ["id" => $box_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function box_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/box/BoxTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OpensensemapSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["box01", "box02", "box03", "sensor01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OPENSENSEMAP_TEST_BOX_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OPENSENSEMAP_TEST_BOX_ENTID" => $idmap,
        "OPENSENSEMAP_TEST_LIVE" => "FALSE",
        "OPENSENSEMAP_TEST_EXPLAIN" => "FALSE",
        "OPENSENSEMAP_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OPENSENSEMAP_TEST_BOX_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["OPENSENSEMAP_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["OPENSENSEMAP_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new OpensensemapSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["OPENSENSEMAP_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["OPENSENSEMAP_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
