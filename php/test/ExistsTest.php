<?php
declare(strict_types=1);

// Opensensemap SDK exists test

require_once __DIR__ . '/../opensensemap_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OpensensemapSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
