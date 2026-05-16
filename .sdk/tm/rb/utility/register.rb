# YadorePublisher SDK utility registration
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

YadorePublisherUtility.registrar = ->(u) {
  u.clean = YadorePublisherUtilities::Clean
  u.done = YadorePublisherUtilities::Done
  u.make_error = YadorePublisherUtilities::MakeError
  u.feature_add = YadorePublisherUtilities::FeatureAdd
  u.feature_hook = YadorePublisherUtilities::FeatureHook
  u.feature_init = YadorePublisherUtilities::FeatureInit
  u.fetcher = YadorePublisherUtilities::Fetcher
  u.make_fetch_def = YadorePublisherUtilities::MakeFetchDef
  u.make_context = YadorePublisherUtilities::MakeContext
  u.make_options = YadorePublisherUtilities::MakeOptions
  u.make_request = YadorePublisherUtilities::MakeRequest
  u.make_response = YadorePublisherUtilities::MakeResponse
  u.make_result = YadorePublisherUtilities::MakeResult
  u.make_point = YadorePublisherUtilities::MakePoint
  u.make_spec = YadorePublisherUtilities::MakeSpec
  u.make_url = YadorePublisherUtilities::MakeUrl
  u.param = YadorePublisherUtilities::Param
  u.prepare_auth = YadorePublisherUtilities::PrepareAuth
  u.prepare_body = YadorePublisherUtilities::PrepareBody
  u.prepare_headers = YadorePublisherUtilities::PrepareHeaders
  u.prepare_method = YadorePublisherUtilities::PrepareMethod
  u.prepare_params = YadorePublisherUtilities::PrepareParams
  u.prepare_path = YadorePublisherUtilities::PreparePath
  u.prepare_query = YadorePublisherUtilities::PrepareQuery
  u.result_basic = YadorePublisherUtilities::ResultBasic
  u.result_body = YadorePublisherUtilities::ResultBody
  u.result_headers = YadorePublisherUtilities::ResultHeaders
  u.transform_request = YadorePublisherUtilities::TransformRequest
  u.transform_response = YadorePublisherUtilities::TransformResponse
}
