# YadorePublisher SDK utility: prepare_body
require_relative 'media'
module YadorePublisherUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return YadorePublisherUtilities.raw_body(ctx.reqdata) if YadorePublisherUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
