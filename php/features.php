<?php
declare(strict_types=1);

// Opensensemap SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OpensensemapFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OpensensemapBaseFeature();
            case "test":
                return new OpensensemapTestFeature();
            default:
                return new OpensensemapBaseFeature();
        }
    }
}
