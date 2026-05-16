# YadorePublisher SDK utility: make_context
require_relative '../core/context'
module YadorePublisherUtilities
  MakeContext = ->(ctxmap, basectx) {
    YadorePublisherContext.new(ctxmap, basectx)
  }
end
