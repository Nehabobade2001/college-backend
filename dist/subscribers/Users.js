"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSubscriber = void 0;
const ApiToken_1 = require("../entities/ApiToken");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
let UsersSubscriber = class UsersSubscriber {
    listenTo() {
        return User_1.User;
    }
    beforeInsert(event) {
    }
    afterInsert(event) {
    }
    beforeUpdate(event) {
    }
    afterUpdate(event) {
        if (event.entity.password || event.entity.role) {
            const userId = event.entity.id;
            event.manager
                .createQueryBuilder()
                .update(ApiToken_1.ApiToken)
                .set({ expiresAt: new Date() })
                .where('userId = :userId', { userId })
                .execute();
        }
    }
    beforeRemove(event) {
    }
    afterRemove(event) {
    }
};
exports.UsersSubscriber = UsersSubscriber;
exports.UsersSubscriber = UsersSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], UsersSubscriber);
//# sourceMappingURL=Users.js.map