"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = () => (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    next();
};
exports.default = errorMiddleware;
