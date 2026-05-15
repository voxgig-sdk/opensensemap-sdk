# Opensensemap SDK utility: make_context
require_relative '../core/context'
module OpensensemapUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpensensemapContext.new(ctxmap, basectx)
  }
end
