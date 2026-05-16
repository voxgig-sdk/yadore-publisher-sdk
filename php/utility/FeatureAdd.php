<?php
declare(strict_types=1);

// YadorePublisher SDK utility: feature_add

class YadorePublisherFeatureAdd
{
    public static function call(YadorePublisherContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
