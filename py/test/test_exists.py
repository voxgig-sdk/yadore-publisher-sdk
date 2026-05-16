# ProjectName SDK exists test

import pytest
from yadorepublisher_sdk import YadorePublisherSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = YadorePublisherSDK.test(None, None)
        assert testsdk is not None
