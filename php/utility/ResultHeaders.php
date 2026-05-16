<?php
declare(strict_types=1);

// YadorePublisher SDK utility: result_headers

class YadorePublisherResultHeaders
{
    public static function call(YadorePublisherContext $ctx): ?YadorePublisherResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
