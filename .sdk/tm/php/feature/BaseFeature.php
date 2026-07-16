<?php
declare(strict_types=1);

// Opensensemap SDK base feature

class OpensensemapBaseFeature
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

    public function init(OpensensemapContext $ctx, array $options): void {}
    public function PostConstruct(OpensensemapContext $ctx): void {}
    public function PostConstructEntity(OpensensemapContext $ctx): void {}
    public function SetData(OpensensemapContext $ctx): void {}
    public function GetData(OpensensemapContext $ctx): void {}
    public function GetMatch(OpensensemapContext $ctx): void {}
    public function SetMatch(OpensensemapContext $ctx): void {}
    public function PrePoint(OpensensemapContext $ctx): void {}
    public function PreSpec(OpensensemapContext $ctx): void {}
    public function PreRequest(OpensensemapContext $ctx): void {}
    public function PreResponse(OpensensemapContext $ctx): void {}
    public function PreResult(OpensensemapContext $ctx): void {}
    public function PreDone(OpensensemapContext $ctx): void {}
    public function PreUnexpected(OpensensemapContext $ctx): void {}
}
