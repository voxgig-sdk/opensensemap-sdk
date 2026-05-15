<?php
declare(strict_types=1);

// Opensensemap SDK utility: result_body

class OpensensemapResultBody
{
    public static function call(OpensensemapContext $ctx): ?OpensensemapResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
