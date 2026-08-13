# YadorePublisher SDK feature factory

from yadorepublisher_sdk.feature.base_feature import YadorePublisherBaseFeature
from yadorepublisher_sdk.feature.test_feature import YadorePublisherTestFeature


def _make_feature(name):
    features = {
        "base": lambda: YadorePublisherBaseFeature(),
        "test": lambda: YadorePublisherTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
