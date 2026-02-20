"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
class Env {
    static get(key, defaultValue) {
        return (process.env[key] || defaultValue);
    }
}
exports.Env = Env;
//# sourceMappingURL=EnvHelper.js.map