<?php
declare(strict_types=1);

// YadorePublisher SDK utility: result_body

class YadorePublisherResultBody
{
    public static function call(YadorePublisherContext $ctx): ?YadorePublisherResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
