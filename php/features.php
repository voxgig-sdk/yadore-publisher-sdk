<?php
declare(strict_types=1);

// YadorePublisher SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class YadorePublisherFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new YadorePublisherBaseFeature();
            case "test":
                return new YadorePublisherTestFeature();
            default:
                return new YadorePublisherBaseFeature();
        }
    }
}
