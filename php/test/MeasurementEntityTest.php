<?php
declare(strict_types=1);

// Measurement entity test

require_once __DIR__ . '/../opensensemap_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MeasurementEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OpensensemapSDK::test(null, null);
        $ent = $testsdk->Measurement(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = measurement_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "measurement." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OPENSENSEMAP_TEST_MEASUREMENT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $measurement_ref01_ent = $client->Measurement(null);
        $measurement_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.measurement"), "measurement_ref01"));
        $measurement_ref01_data["box_id"] = $setup["idmap"]["box01"];

        $measurement_ref01_data_result = $measurement_ref01_ent->create($measurement_ref01_data, null);
        $measurement_ref01_data = Helpers::to_map(is_object($measurement_ref01_data_result) && method_exists($measurement_ref01_data_result, 'data_get') ? $measurement_ref01_data_result->data_get() : $measurement_ref01_data_result);
        $this->assertNotNull($measurement_ref01_data);

    }
}

function measurement_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/measurement/MeasurementTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OpensensemapSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["measurement01", "measurement02", "measurement03", "box01", "box02", "box03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OPENSENSEMAP_TEST_MEASUREMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OPENSENSEMAP_TEST_MEASUREMENT_ENTID" => $idmap,
        "OPENSENSEMAP_TEST_LIVE" => "FALSE",
        "OPENSENSEMAP_TEST_EXPLAIN" => "FALSE",
        "OPENSENSEMAP_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OPENSENSEMAP_TEST_MEASUREMENT_ENTID"]);
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
