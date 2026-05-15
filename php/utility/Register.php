<?php
declare(strict_types=1);

// Opensensemap SDK utility registration

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

OpensensemapUtility::setRegistrar(function (OpensensemapUtility $u): void {
    $u->clean = [OpensensemapClean::class, 'call'];
    $u->done = [OpensensemapDone::class, 'call'];
    $u->make_error = [OpensensemapMakeError::class, 'call'];
    $u->feature_add = [OpensensemapFeatureAdd::class, 'call'];
    $u->feature_hook = [OpensensemapFeatureHook::class, 'call'];
    $u->feature_init = [OpensensemapFeatureInit::class, 'call'];
    $u->fetcher = [OpensensemapFetcher::class, 'call'];
    $u->make_fetch_def = [OpensensemapMakeFetchDef::class, 'call'];
    $u->make_context = [OpensensemapMakeContext::class, 'call'];
    $u->make_options = [OpensensemapMakeOptions::class, 'call'];
    $u->make_request = [OpensensemapMakeRequest::class, 'call'];
    $u->make_response = [OpensensemapMakeResponse::class, 'call'];
    $u->make_result = [OpensensemapMakeResult::class, 'call'];
    $u->make_point = [OpensensemapMakePoint::class, 'call'];
    $u->make_spec = [OpensensemapMakeSpec::class, 'call'];
    $u->make_url = [OpensensemapMakeUrl::class, 'call'];
    $u->param = [OpensensemapParam::class, 'call'];
    $u->prepare_auth = [OpensensemapPrepareAuth::class, 'call'];
    $u->prepare_body = [OpensensemapPrepareBody::class, 'call'];
    $u->prepare_headers = [OpensensemapPrepareHeaders::class, 'call'];
    $u->prepare_method = [OpensensemapPrepareMethod::class, 'call'];
    $u->prepare_params = [OpensensemapPrepareParams::class, 'call'];
    $u->prepare_path = [OpensensemapPreparePath::class, 'call'];
    $u->prepare_query = [OpensensemapPrepareQuery::class, 'call'];
    $u->result_basic = [OpensensemapResultBasic::class, 'call'];
    $u->result_body = [OpensensemapResultBody::class, 'call'];
    $u->result_headers = [OpensensemapResultHeaders::class, 'call'];
    $u->transform_request = [OpensensemapTransformRequest::class, 'call'];
    $u->transform_response = [OpensensemapTransformResponse::class, 'call'];
});
