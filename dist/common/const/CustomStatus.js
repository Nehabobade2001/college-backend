"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var CustomStatus;
(function (CustomStatus) {
    CustomStatus["ACTIVE"] = "active";
    CustomStatus["INACTIVE"] = "inactive";
    CustomStatus["BLOCKED"] = "blocked";
    CustomStatus["PENDING"] = "pending";
})(CustomStatus || (exports.CustomStatus = CustomStatus = {}));
(0, graphql_1.registerEnumType)(CustomStatus, {
    name: 'CustomStatus',
    description: 'Custom status for entities',
});
//# sourceMappingURL=CustomStatus.js.map