# Opensensemap SDK utility: feature_add
module OpensensemapUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
