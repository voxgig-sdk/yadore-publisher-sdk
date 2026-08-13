# YadorePublisher SDK utility: make_context

from yadorepublisher_sdk.core.context import YadorePublisherContext


def make_context_util(ctxmap, basectx):
    return YadorePublisherContext(ctxmap, basectx)
