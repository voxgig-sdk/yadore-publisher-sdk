# YadorePublisher SDK feature factory

from yadorepublisher_sdk.feature.base_feature import YadorePublisherBaseFeature
from yadorepublisher_sdk.feature.ratelimit_feature import YadorePublisherRatelimitFeature
from yadorepublisher_sdk.feature.retry_feature import YadorePublisherRetryFeature
from yadorepublisher_sdk.feature.test_feature import YadorePublisherTestFeature
from yadorepublisher_sdk.feature.timeout_feature import YadorePublisherTimeoutFeature


_FEATURES = {
    "base": lambda: YadorePublisherBaseFeature(),
    "ratelimit": lambda: YadorePublisherRatelimitFeature(),
    "retry": lambda: YadorePublisherRetryFeature(),
    "test": lambda: YadorePublisherTestFeature(),
    "timeout": lambda: YadorePublisherTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
