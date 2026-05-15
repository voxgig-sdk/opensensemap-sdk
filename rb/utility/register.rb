# Opensensemap SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OpensensemapUtility.registrar = ->(u) {
  u.clean = OpensensemapUtilities::Clean
  u.done = OpensensemapUtilities::Done
  u.make_error = OpensensemapUtilities::MakeError
  u.feature_add = OpensensemapUtilities::FeatureAdd
  u.feature_hook = OpensensemapUtilities::FeatureHook
  u.feature_init = OpensensemapUtilities::FeatureInit
  u.fetcher = OpensensemapUtilities::Fetcher
  u.make_fetch_def = OpensensemapUtilities::MakeFetchDef
  u.make_context = OpensensemapUtilities::MakeContext
  u.make_options = OpensensemapUtilities::MakeOptions
  u.make_request = OpensensemapUtilities::MakeRequest
  u.make_response = OpensensemapUtilities::MakeResponse
  u.make_result = OpensensemapUtilities::MakeResult
  u.make_point = OpensensemapUtilities::MakePoint
  u.make_spec = OpensensemapUtilities::MakeSpec
  u.make_url = OpensensemapUtilities::MakeUrl
  u.param = OpensensemapUtilities::Param
  u.prepare_auth = OpensensemapUtilities::PrepareAuth
  u.prepare_body = OpensensemapUtilities::PrepareBody
  u.prepare_headers = OpensensemapUtilities::PrepareHeaders
  u.prepare_method = OpensensemapUtilities::PrepareMethod
  u.prepare_params = OpensensemapUtilities::PrepareParams
  u.prepare_path = OpensensemapUtilities::PreparePath
  u.prepare_query = OpensensemapUtilities::PrepareQuery
  u.result_basic = OpensensemapUtilities::ResultBasic
  u.result_body = OpensensemapUtilities::ResultBody
  u.result_headers = OpensensemapUtilities::ResultHeaders
  u.transform_request = OpensensemapUtilities::TransformRequest
  u.transform_response = OpensensemapUtilities::TransformResponse
}
