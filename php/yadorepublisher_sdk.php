<?php
declare(strict_types=1);

// YadorePublisher SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class YadorePublisherSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new YadorePublisherUtility();
        $this->_utility = $utility;

        $config = YadorePublisherConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = YadorePublisherHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = YadorePublisherHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, YadorePublisherFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return YadorePublisherUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = YadorePublisherHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = YadorePublisherHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = YadorePublisherHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new YadorePublisherSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = YadorePublisherHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = YadorePublisherHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_conversion_detail = null;

    // Idiomatic facade: $client->conversion_detail()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ConversionDetail() (PHP method
    // names are case-insensitive).
    public function conversion_detail($data = null)
    {
        require_once __DIR__ . '/entity/conversion_detail_entity.php';
        if ($data === null) {
            if ($this->_conversion_detail === null) {
                $this->_conversion_detail = new ConversionDetailEntity($this, null);
            }
            return $this->_conversion_detail;
        }
        return new ConversionDetailEntity($this, $data);
    }


    private $_conversion_detail_merchant = null;

    // Idiomatic facade: $client->conversion_detail_merchant()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ConversionDetailMerchant() (PHP method
    // names are case-insensitive).
    public function conversion_detail_merchant($data = null)
    {
        require_once __DIR__ . '/entity/conversion_detail_merchant_entity.php';
        if ($data === null) {
            if ($this->_conversion_detail_merchant === null) {
                $this->_conversion_detail_merchant = new ConversionDetailMerchantEntity($this, null);
            }
            return $this->_conversion_detail_merchant;
        }
        return new ConversionDetailMerchantEntity($this, $data);
    }


    private $_conversion_general = null;

    // Idiomatic facade: $client->conversion_general()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ConversionGeneral() (PHP method
    // names are case-insensitive).
    public function conversion_general($data = null)
    {
        require_once __DIR__ . '/entity/conversion_general_entity.php';
        if ($data === null) {
            if ($this->_conversion_general === null) {
                $this->_conversion_general = new ConversionGeneralEntity($this, null);
            }
            return $this->_conversion_general;
        }
        return new ConversionGeneralEntity($this, $data);
    }


    private $_conversion_status = null;

    // Idiomatic facade: $client->conversion_status()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ConversionStatus() (PHP method
    // names are case-insensitive).
    public function conversion_status($data = null)
    {
        require_once __DIR__ . '/entity/conversion_status_entity.php';
        if ($data === null) {
            if ($this->_conversion_status === null) {
                $this->_conversion_status = new ConversionStatusEntity($this, null);
            }
            return $this->_conversion_status;
        }
        return new ConversionStatusEntity($this, $data);
    }


    private $_deeplink = null;

    // Idiomatic facade: $client->deeplink()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Deeplink() (PHP method
    // names are case-insensitive).
    public function deeplink($data = null)
    {
        require_once __DIR__ . '/entity/deeplink_entity.php';
        if ($data === null) {
            if ($this->_deeplink === null) {
                $this->_deeplink = new DeeplinkEntity($this, null);
            }
            return $this->_deeplink;
        }
        return new DeeplinkEntity($this, $data);
    }


    private $_deeplink_merchant = null;

    // Idiomatic facade: $client->deeplink_merchant()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias DeeplinkMerchant() (PHP method
    // names are case-insensitive).
    public function deeplink_merchant($data = null)
    {
        require_once __DIR__ . '/entity/deeplink_merchant_entity.php';
        if ($data === null) {
            if ($this->_deeplink_merchant === null) {
                $this->_deeplink_merchant = new DeeplinkMerchantEntity($this, null);
            }
            return $this->_deeplink_merchant;
        }
        return new DeeplinkMerchantEntity($this, $data);
    }


    private $_dnt = null;

    // Idiomatic facade: $client->dnt()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Dnt() (PHP method
    // names are case-insensitive).
    public function dnt($data = null)
    {
        require_once __DIR__ . '/entity/dnt_entity.php';
        if ($data === null) {
            if ($this->_dnt === null) {
                $this->_dnt = new DntEntity($this, null);
            }
            return $this->_dnt;
        }
        return new DntEntity($this, $data);
    }


    private $_market = null;

    // Idiomatic facade: $client->market()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Market() (PHP method
    // names are case-insensitive).
    public function market($data = null)
    {
        require_once __DIR__ . '/entity/market_entity.php';
        if ($data === null) {
            if ($this->_market === null) {
                $this->_market = new MarketEntity($this, null);
            }
            return $this->_market;
        }
        return new MarketEntity($this, $data);
    }


    private $_merchant = null;

    // Idiomatic facade: $client->merchant()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Merchant() (PHP method
    // names are case-insensitive).
    public function merchant($data = null)
    {
        require_once __DIR__ . '/entity/merchant_entity.php';
        if ($data === null) {
            if ($this->_merchant === null) {
                $this->_merchant = new MerchantEntity($this, null);
            }
            return $this->_merchant;
        }
        return new MerchantEntity($this, $data);
    }


    private $_offer = null;

    // Idiomatic facade: $client->offer()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Offer() (PHP method
    // names are case-insensitive).
    public function offer($data = null)
    {
        require_once __DIR__ . '/entity/offer_entity.php';
        if ($data === null) {
            if ($this->_offer === null) {
                $this->_offer = new OfferEntity($this, null);
            }
            return $this->_offer;
        }
        return new OfferEntity($this, $data);
    }


    private $_report_detail = null;

    // Idiomatic facade: $client->report_detail()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ReportDetail() (PHP method
    // names are case-insensitive).
    public function report_detail($data = null)
    {
        require_once __DIR__ . '/entity/report_detail_entity.php';
        if ($data === null) {
            if ($this->_report_detail === null) {
                $this->_report_detail = new ReportDetailEntity($this, null);
            }
            return $this->_report_detail;
        }
        return new ReportDetailEntity($this, $data);
    }


    private $_report_general = null;

    // Idiomatic facade: $client->report_general()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ReportGeneral() (PHP method
    // names are case-insensitive).
    public function report_general($data = null)
    {
        require_once __DIR__ . '/entity/report_general_entity.php';
        if ($data === null) {
            if ($this->_report_general === null) {
                $this->_report_general = new ReportGeneralEntity($this, null);
            }
            return $this->_report_general;
        }
        return new ReportGeneralEntity($this, $data);
    }


    private $_report_modified = null;

    // Idiomatic facade: $client->report_modified()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ReportModified() (PHP method
    // names are case-insensitive).
    public function report_modified($data = null)
    {
        require_once __DIR__ . '/entity/report_modified_entity.php';
        if ($data === null) {
            if ($this->_report_modified === null) {
                $this->_report_modified = new ReportModifiedEntity($this, null);
            }
            return $this->_report_modified;
        }
        return new ReportModifiedEntity($this, $data);
    }


    private $_report_status = null;

    // Idiomatic facade: $client->report_status()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ReportStatus() (PHP method
    // names are case-insensitive).
    public function report_status($data = null)
    {
        require_once __DIR__ . '/entity/report_status_entity.php';
        if ($data === null) {
            if ($this->_report_status === null) {
                $this->_report_status = new ReportStatusEntity($this, null);
            }
            return $this->_report_status;
        }
        return new ReportStatusEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new YadorePublisherSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
