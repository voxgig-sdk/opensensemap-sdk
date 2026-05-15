<?php
declare(strict_types=1);

// Opensensemap SDK utility: prepare_body

class OpensensemapPrepareBody
{
    public static function call(OpensensemapContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
