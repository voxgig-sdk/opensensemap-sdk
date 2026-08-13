# Opensensemap SDK feature factory

from opensensemap_sdk.feature.base_feature import OpensensemapBaseFeature
from opensensemap_sdk.feature.test_feature import OpensensemapTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpensensemapBaseFeature(),
        "test": lambda: OpensensemapTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
