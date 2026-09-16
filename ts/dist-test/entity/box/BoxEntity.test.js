"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BoxEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENSENSEMAP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENSENSEMAP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpensensemapSDK.test();
        const ent = testsdk.Box();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENSENSEMAP_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'box.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "createdAt", "req": false, "short": "Creation timestamp", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "description", "req": false, "short": "Description of the senseBox", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "exposure", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Exposure type of the senseBox", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "grouptag", "req": false, "short": "Group tag for categorization", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the senseBox", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "location", "op": { "create": { "req": true, "type": "`$OBJECT`" }, "update": { "req": true, "type": "`$OBJECT`" } }, "req": false, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "model", "req": false, "short": "Model of the senseBox", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Name of the senseBox", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "sensors", "req": false, "type": "`$ARRAY`", "index$": 8 }, { "active": true, "format": "date-time", "name": "updatedAt", "req": false, "short": "Last update timestamp", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "value", "req": false, "short": "Measurement value", "type": "`$STRING`", "index$": 10 }], "id": { "field": "id", "name": "id" }, "name": "box", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "box_id", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "POST /boxes/{boxId}/data", "json": "{\"operationId\":\"postMeasurements\",\"parameters\":[{\"description\":\"ID of the senseBox\",\"in\":\"path\",\"name\":\"boxId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":{\"oneOf\":[{\"type\":\"string\"},{\"type\":\"number\"},{\"items\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}]},\"example\":{\"sensor1\":\"23.5\",\"sensor2\":[{\"createdAt\":\"2023-01-01T12:00:00Z\",\"value\":\"23.5\"}]},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"description\":\"Measurements posted successfully\"},\"400\":{\"description\":\"Invalid input\"},\"401\":{\"description\":\"Unauthorized\"},\"404\":{\"description\":\"SenseBox not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/boxes/{boxId}/data", "rename": { "param": { "boxId": "id" } }, "segments": [{ "lit": "boxes" }, { "var": "id" }, { "lit": "data" }], "select": { "$action": "data", "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "POST /boxes", "json": "{\"operationId\":\"createBox\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Description of the senseBox\",\"type\":\"string\"},\"exposure\":{\"description\":\"Exposure type of the senseBox\",\"enum\":[\"indoor\",\"outdoor\",\"mobile\"],\"type\":\"string\"},\"grouptag\":{\"description\":\"Group tag for categorization\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"description\":\"Longitude and latitude coordinates [lng, lat]\",\"items\":{\"type\":\"number\"},\"maxItems\":2,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"model\":{\"description\":\"Model of the senseBox\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the senseBox\",\"type\":\"string\"},\"sensors\":{\"items\":{\"properties\":{\"icon\":{\"description\":\"Icon identifier for the sensor\",\"type\":\"string\"},\"sensorType\":{\"description\":\"Type of sensor\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the sensor\",\"type\":\"string\"},\"unit\":{\"description\":\"Unit of measurement\",\"type\":\"string\"}},\"required\":[\"title\",\"unit\",\"sensorType\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"name\",\"exposure\",\"location\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the senseBox\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the senseBox\",\"type\":\"string\"},\"exposure\":{\"description\":\"Exposure type of the senseBox\",\"enum\":[\"indoor\",\"outdoor\",\"mobile\"],\"type\":\"string\"},\"grouptag\":{\"description\":\"Group tag for categorization\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"description\":\"Longitude and latitude coordinates [lng, lat]\",\"items\":{\"type\":\"number\"},\"maxItems\":2,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"type\":\"object\"},\"model\":{\"description\":\"Model of the senseBox\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the senseBox\",\"type\":\"string\"},\"sensors\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the sensor\",\"type\":\"string\"},\"icon\":{\"description\":\"Icon identifier for the sensor\",\"type\":\"string\"},\"lastMeasurement\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp of the measurement\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"Measurement value\",\"type\":\"string\"}},\"type\":\"object\"},\"sensorType\":{\"description\":\"Type of sensor\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the sensor\",\"type\":\"string\"},\"unit\":{\"description\":\"Unit of measurement\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"SenseBox created successfully\"},\"400\":{\"description\":\"Invalid input\"},\"401\":{\"description\":\"Unauthorized\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/boxes", "segments": [{ "lit": "boxes" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "box_id", "orig": "box_id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "sensor_id", "orig": "sensor_id", "reqd": true, "type": "`$STRING`", "index$": 1 }], "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "from_date", "orig": "from_date", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "to_date", "orig": "to_date", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /boxes/{boxId}/{sensorId}", "json": "{\"operationId\":\"getSensorMeasurements\",\"parameters\":[{\"description\":\"ID of the senseBox\",\"in\":\"path\",\"name\":\"boxId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"ID of the sensor\",\"in\":\"path\",\"name\":\"sensorId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date for filtering measurements (ISO 8601 format)\",\"in\":\"query\",\"name\":\"from-date\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"End date for filtering measurements (ISO 8601 format)\",\"in\":\"query\",\"name\":\"to-date\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Response format (json or csv)\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp of the measurement\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"Measurement value\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"text/csv\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"SenseBox or sensor not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/boxes/{boxId}/{sensorId}", "rename": { "param": { "boxId": "box_id", "sensorId": "sensor_id" } }, "segments": [{ "lit": "boxes" }, { "var": "box_id" }, { "var": "sensor_id" }], "select": { "exist": ["box_id", "format", "from_date", "sensor_id", "to_date"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "bbox", "orig": "bbox", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "exposure", "orig": "exposure", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "grouptag", "orig": "grouptag", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /boxes", "json": "{\"operationId\":\"getBoxes\",\"parameters\":[{\"description\":\"Response format (json or csv)\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"Bounding box to filter senseBoxes (format: lng1,lat1,lng2,lat2)\",\"in\":\"query\",\"name\":\"bbox\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by exposure type\",\"in\":\"query\",\"name\":\"exposure\",\"required\":false,\"schema\":{\"enum\":[\"indoor\",\"outdoor\",\"mobile\"],\"type\":\"string\"}},{\"description\":\"Filter by group tag\",\"in\":\"query\",\"name\":\"grouptag\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the senseBox\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the senseBox\",\"type\":\"string\"},\"exposure\":{\"description\":\"Exposure type of the senseBox\",\"enum\":[\"indoor\",\"outdoor\",\"mobile\"],\"type\":\"string\"},\"grouptag\":{\"description\":\"Group tag for categorization\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"description\":\"Longitude and latitude coordinates [lng, lat]\",\"items\":{\"type\":\"number\"},\"maxItems\":2,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"type\":\"object\"},\"model\":{\"description\":\"Model of the senseBox\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the senseBox\",\"type\":\"string\"},\"sensors\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the sensor\",\"type\":\"string\"},\"icon\":{\"description\":\"Icon identifier for the sensor\",\"type\":\"string\"},\"lastMeasurement\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp of the measurement\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"Measurement value\",\"type\":\"string\"}},\"type\":\"object\"},\"sensorType\":{\"description\":\"Type of sensor\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the sensor\",\"type\":\"string\"},\"unit\":{\"description\":\"Unit of measurement\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"text/csv\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/boxes", "segments": [{ "lit": "boxes" }], "select": { "exist": ["bbox", "exposure", "format", "grouptag"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "box_id", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /boxes/{boxId}", "json": "{\"operationId\":\"getBoxById\",\"parameters\":[{\"description\":\"ID of the senseBox\",\"in\":\"path\",\"name\":\"boxId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Response format (json or csv)\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the senseBox\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the senseBox\",\"type\":\"string\"},\"exposure\":{\"description\":\"Exposure type of the senseBox\",\"enum\":[\"indoor\",\"outdoor\",\"mobile\"],\"type\":\"string\"},\"grouptag\":{\"description\":\"Group tag for categorization\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"description\":\"Longitude and latitude coordinates [lng, lat]\",\"items\":{\"type\":\"number\"},\"maxItems\":2,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"type\":\"object\"},\"model\":{\"description\":\"Model of the senseBox\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the senseBox\",\"type\":\"string\"},\"sensors\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the sensor\",\"type\":\"string\"},\"icon\":{\"description\":\"Icon identifier for the sensor\",\"type\":\"string\"},\"lastMeasurement\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp of the measurement\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"Measurement value\",\"type\":\"string\"}},\"type\":\"object\"},\"sensorType\":{\"description\":\"Type of sensor\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the sensor\",\"type\":\"string\"},\"unit\":{\"description\":\"Unit of measurement\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"SenseBox not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/boxes/{boxId}", "rename": { "param": { "boxId": "id" } }, "segments": [{ "lit": "boxes" }, { "var": "id" }], "select": { "exist": ["format", "id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "box_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "DELETE /boxes/{boxId}", "json": "{\"operationId\":\"deleteBox\",\"parameters\":[{\"description\":\"ID of the senseBox\",\"in\":\"path\",\"name\":\"boxId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"SenseBox deleted successfully\"},\"401\":{\"description\":\"Unauthorized\"},\"404\":{\"description\":\"SenseBox not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/boxes/{boxId}", "rename": { "param": { "boxId": "id" } }, "segments": [{ "lit": "boxes" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "box_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "PUT /boxes/{boxId}", "json": "{\"operationId\":\"updateBox\",\"parameters\":[{\"description\":\"ID of the senseBox\",\"in\":\"path\",\"name\":\"boxId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Description of the senseBox\",\"type\":\"string\"},\"exposure\":{\"description\":\"Exposure type of the senseBox\",\"enum\":[\"indoor\",\"outdoor\",\"mobile\"],\"type\":\"string\"},\"grouptag\":{\"description\":\"Group tag for categorization\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"description\":\"Longitude and latitude coordinates [lng, lat]\",\"items\":{\"type\":\"number\"},\"maxItems\":2,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"model\":{\"description\":\"Model of the senseBox\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the senseBox\",\"type\":\"string\"},\"sensors\":{\"items\":{\"properties\":{\"icon\":{\"description\":\"Icon identifier for the sensor\",\"type\":\"string\"},\"sensorType\":{\"description\":\"Type of sensor\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the sensor\",\"type\":\"string\"},\"unit\":{\"description\":\"Unit of measurement\",\"type\":\"string\"}},\"required\":[\"title\",\"unit\",\"sensorType\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"name\",\"exposure\",\"location\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the senseBox\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the senseBox\",\"type\":\"string\"},\"exposure\":{\"description\":\"Exposure type of the senseBox\",\"enum\":[\"indoor\",\"outdoor\",\"mobile\"],\"type\":\"string\"},\"grouptag\":{\"description\":\"Group tag for categorization\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"description\":\"Longitude and latitude coordinates [lng, lat]\",\"items\":{\"type\":\"number\"},\"maxItems\":2,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"type\":\"object\"},\"model\":{\"description\":\"Model of the senseBox\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the senseBox\",\"type\":\"string\"},\"sensors\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the sensor\",\"type\":\"string\"},\"icon\":{\"description\":\"Icon identifier for the sensor\",\"type\":\"string\"},\"lastMeasurement\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp of the measurement\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"Measurement value\",\"type\":\"string\"}},\"type\":\"object\"},\"sensorType\":{\"description\":\"Type of sensor\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the sensor\",\"type\":\"string\"},\"unit\":{\"description\":\"Unit of measurement\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"SenseBox updated successfully\"},\"400\":{\"description\":\"Invalid input\"},\"401\":{\"description\":\"Unauthorized\"},\"404\":{\"description\":\"SenseBox not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/boxes/{boxId}", "rename": { "param": { "boxId": "id" } }, "segments": [{ "lit": "boxes" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["box"]] }, "key$": "box", "name__orig": "box", "Name": "Box", "name_": "box", "name-": "box", "NAME": "BOX", "index$": 0 }, { "active": true, "entity": "box", "key$": "BasicBoxFlow", "kind": "basic", "name": "BasicBoxFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "box_ref01" }, "match": { "box_id": "box01", "sensor_id": "sensor01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "box_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "box_ref01", "srcdatavar": "box_ref01_data", "suffix": "_up0", "textfield": "createdAt" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-box_ref01" } }], "valid": [], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "box_ref01", "srcdatavar": "box_ref01_data", "suffix": "_dt0" }, "match": { "id": "box01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-box_ref01" } }], "index$": 3 }, { "active": true, "data": {}, "input": { "ref": "box_ref01", "suffix": "_rm0" }, "match": { "id": "box01" }, "op": "remove", "spec": [], "valid": [], "index$": 4 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "box_ref01" } }], "index$": 5 }] }, 'Box');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const box_ref01_ent = client.Box();
        let box_ref01_data = setup.data.new.box['box_ref01'];
        box_ref01_data['box_id'] = setup.idmap['box01'];
        box_ref01_data['sensor_id'] = setup.idmap['sensor01'];
        box_ref01_data = (await box_ref01_ent.create(box_ref01_data)).data();
        (0, node_assert_1.default)(null != box_ref01_data.id);
        // LIST
        const box_ref01_match = {};
        const box_ref01_list = (await box_ref01_ent.list(box_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(box_ref01_list, { id: box_ref01_data.id })));
        // UPDATE
        const box_ref01_data_up0 = {};
        box_ref01_data_up0.id = box_ref01_data.id;
        const box_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-box_ref01_' + setup.now };
        box_ref01_data_up0[box_ref01_markdef_up0.name] = box_ref01_markdef_up0.value;
        const box_ref01_resdata_up0 = (await box_ref01_ent.update(box_ref01_data_up0)).data();
        (0, node_assert_1.default)(box_ref01_resdata_up0.id === box_ref01_data_up0.id);
        (0, node_assert_1.default)(box_ref01_resdata_up0[box_ref01_markdef_up0.name] === box_ref01_markdef_up0.value);
        // LOAD
        const box_ref01_match_dt0 = {};
        box_ref01_match_dt0.id = box_ref01_data.id;
        const box_ref01_data_dt0 = (await box_ref01_ent.load(box_ref01_match_dt0)).data();
        (0, node_assert_1.default)(box_ref01_data_dt0.id === box_ref01_data.id);
        // REMOVE
        const box_ref01_match_rm0 = { id: box_ref01_data.id };
        await box_ref01_ent.remove(box_ref01_match_rm0);
        // LIST
        const box_ref01_match_rt0 = {};
        const box_ref01_list_rt0 = (await box_ref01_ent.list(box_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(box_ref01_list_rt0, { id: box_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/box/BoxTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpensensemapSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['box01', 'box02', 'box03', 'box01', 'box02', 'box03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENSENSEMAP_TEST_BOX_ENTID': idmap,
        'OPENSENSEMAP_TEST_LIVE': 'FALSE',
        'OPENSENSEMAP_TEST_EXPLAIN': 'FALSE',
        'OPENSENSEMAP_APIKEY': '',
    });
    idmap = env['OPENSENSEMAP_TEST_BOX_ENTID'];
    const live = 'TRUE' === env.OPENSENSEMAP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENSENSEMAP_TEST_BOX_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpensensemapSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.OPENSENSEMAP_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.OPENSENSEMAP_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BoxEntity.test.js.map