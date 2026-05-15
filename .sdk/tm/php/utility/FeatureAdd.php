<?php
declare(strict_types=1);

// Opensensemap SDK utility: feature_add

class OpensensemapFeatureAdd
{
    public static function call(OpensensemapContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
