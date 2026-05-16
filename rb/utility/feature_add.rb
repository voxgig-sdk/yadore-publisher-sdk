# YadorePublisher SDK utility: feature_add
module YadorePublisherUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
