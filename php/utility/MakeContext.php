<?php
declare(strict_types=1);

// YadorePublisher SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class YadorePublisherMakeContext
{
    public static function call(array $ctxmap, ?YadorePublisherContext $basectx): YadorePublisherContext
    {
        return new YadorePublisherContext($ctxmap, $basectx);
    }
}
