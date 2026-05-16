<?php
declare(strict_types=1);

// YadorePublisher SDK utility: feature_hook

class YadorePublisherFeatureHook
{
    public static function call(YadorePublisherContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
