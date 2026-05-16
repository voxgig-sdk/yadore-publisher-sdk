# YadorePublisher SDK feature factory

from feature.base_feature import YadorePublisherBaseFeature
from feature.test_feature import YadorePublisherTestFeature


def _make_feature(name):
    features = {
        "base": lambda: YadorePublisherBaseFeature(),
        "test": lambda: YadorePublisherTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
