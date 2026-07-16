<?php
declare(strict_types=1);

// YadorePublisher SDK base feature

class YadorePublisherBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(YadorePublisherContext $ctx, array $options): void {}
    public function PostConstruct(YadorePublisherContext $ctx): void {}
    public function PostConstructEntity(YadorePublisherContext $ctx): void {}
    public function SetData(YadorePublisherContext $ctx): void {}
    public function GetData(YadorePublisherContext $ctx): void {}
    public function GetMatch(YadorePublisherContext $ctx): void {}
    public function SetMatch(YadorePublisherContext $ctx): void {}
    public function PrePoint(YadorePublisherContext $ctx): void {}
    public function PreSpec(YadorePublisherContext $ctx): void {}
    public function PreRequest(YadorePublisherContext $ctx): void {}
    public function PreResponse(YadorePublisherContext $ctx): void {}
    public function PreResult(YadorePublisherContext $ctx): void {}
    public function PreDone(YadorePublisherContext $ctx): void {}
    public function PreUnexpected(YadorePublisherContext $ctx): void {}
}
