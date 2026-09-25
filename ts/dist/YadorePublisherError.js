"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YadorePublisherError = void 0;
class YadorePublisherError extends Error {
    isYadorePublisherError = true;
    sdk = 'YadorePublisher';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.YadorePublisherError = YadorePublisherError;
//# sourceMappingURL=YadorePublisherError.js.map