<?php
declare(strict_types=1);

// Opensensemap SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpensensemapMakeContext
{
    public static function call(array $ctxmap, ?OpensensemapContext $basectx): OpensensemapContext
    {
        return new OpensensemapContext($ctxmap, $basectx);
    }
}
