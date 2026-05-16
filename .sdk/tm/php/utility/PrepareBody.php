<?php
declare(strict_types=1);

// YadorePublisher SDK utility: prepare_body

class YadorePublisherPrepareBody
{
    public static function call(YadorePublisherContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
