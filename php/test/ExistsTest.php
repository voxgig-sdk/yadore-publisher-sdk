<?php
declare(strict_types=1);

// YadorePublisher SDK exists test

require_once __DIR__ . '/../yadorepublisher_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = YadorePublisherSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
