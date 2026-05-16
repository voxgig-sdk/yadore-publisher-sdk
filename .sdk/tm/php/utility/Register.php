<?php
declare(strict_types=1);

// YadorePublisher SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

YadorePublisherUtility::setRegistrar(function (YadorePublisherUtility $u): void {
    $u->clean = [YadorePublisherClean::class, 'call'];
    $u->done = [YadorePublisherDone::class, 'call'];
    $u->make_error = [YadorePublisherMakeError::class, 'call'];
    $u->feature_add = [YadorePublisherFeatureAdd::class, 'call'];
    $u->feature_hook = [YadorePublisherFeatureHook::class, 'call'];
    $u->feature_init = [YadorePublisherFeatureInit::class, 'call'];
    $u->fetcher = [YadorePublisherFetcher::class, 'call'];
    $u->make_fetch_def = [YadorePublisherMakeFetchDef::class, 'call'];
    $u->make_context = [YadorePublisherMakeContext::class, 'call'];
    $u->make_options = [YadorePublisherMakeOptions::class, 'call'];
    $u->make_request = [YadorePublisherMakeRequest::class, 'call'];
    $u->make_response = [YadorePublisherMakeResponse::class, 'call'];
    $u->make_result = [YadorePublisherMakeResult::class, 'call'];
    $u->make_point = [YadorePublisherMakePoint::class, 'call'];
    $u->make_spec = [YadorePublisherMakeSpec::class, 'call'];
    $u->make_url = [YadorePublisherMakeUrl::class, 'call'];
    $u->param = [YadorePublisherParam::class, 'call'];
    $u->prepare_auth = [YadorePublisherPrepareAuth::class, 'call'];
    $u->prepare_body = [YadorePublisherPrepareBody::class, 'call'];
    $u->prepare_headers = [YadorePublisherPrepareHeaders::class, 'call'];
    $u->prepare_method = [YadorePublisherPrepareMethod::class, 'call'];
    $u->prepare_params = [YadorePublisherPrepareParams::class, 'call'];
    $u->prepare_path = [YadorePublisherPreparePath::class, 'call'];
    $u->prepare_query = [YadorePublisherPrepareQuery::class, 'call'];
    $u->result_basic = [YadorePublisherResultBasic::class, 'call'];
    $u->result_body = [YadorePublisherResultBody::class, 'call'];
    $u->result_headers = [YadorePublisherResultHeaders::class, 'call'];
    $u->transform_request = [YadorePublisherTransformRequest::class, 'call'];
    $u->transform_response = [YadorePublisherTransformResponse::class, 'call'];
});
