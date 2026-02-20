"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const payment_service_1 = require("./payment.service");
const CurrentUser_1 = require("../../common/decorators/CurrentUser");
const User_1 = require("../../entities/User");
const Subscription_1 = require("../../entities/Subscription");
const create_order_dto_1 = require("./create-order.dto");
const payment_input_dto_1 = require("./payment-input.dto");
const graphql_type_json_1 = require("graphql-type-json");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
let PaymentResolver = class PaymentResolver {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createMultipleOrder(input, user) {
        const order = await this.paymentService.createMultipleOrder(input.planIds, input.amount, input.duration, input.couponCode, user);
        console.log('Order:', JSON.stringify(order, null, 2));
        return {
            ...order,
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            status: order.status,
            created_at: order.created_at,
            receipt: order.receipt,
            user: order.customer_details,
        };
    }
    async verifyPayment(input, user) {
        return this.paymentService.verifyPayment(input, user);
    }
};
exports.PaymentResolver = PaymentResolver;
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSONObject),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateMultipleOrderInput,
        User_1.User]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "createMultipleOrder", null);
__decorate([
    (0, graphql_1.Mutation)(() => [Subscription_1.Subscriptions]),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_input_dto_1.VerifyPaymentInput,
        User_1.User]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "verifyPayment", null);
exports.PaymentResolver = PaymentResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentResolver);
//# sourceMappingURL=payment.resolver.js.map