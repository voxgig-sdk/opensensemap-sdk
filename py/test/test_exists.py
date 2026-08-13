# Opensensemap SDK exists test

import pytest
from opensensemap_sdk import OpensensemapSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpensensemapSDK.test(None, None)
        assert testsdk is not None
