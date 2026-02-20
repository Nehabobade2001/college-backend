"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const Plan_1 = require("../../entities/Plan");
const Subscription_1 = require("../../entities/Subscription");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto = __importStar(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
const typeorm_2 = require("typeorm");
let PaymentService = class PaymentService {
    constructor(planRepo, subRepo) {
        this.planRepo = planRepo;
        this.subRepo = subRepo;
        this.razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    async createMultipleOrder(planIds, amount, duration, couponCode, user) {
        const plans = await this.planRepo.find({
            where: { id: (0, typeorm_2.In)(planIds) },
        });
        if (plans.length !== planIds.length) {
            throw new Error('One or more plans are invalid');
        }
        const order = await this.razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: true,
            notes: {
                userId: user.id,
                name: user.name,
                organizationId: user.organizationId,
                planIds: planIds.join(','),
                couponCode: couponCode || null,
            },
        });
        return {
            ...order,
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            status: order.status,
            created_at: order.created_at,
            receipt: order.receipt,
            duration: duration,
            couponCode: couponCode,
        };
    }
    catch(error) {
        console.error('Error creating Razorpay order:', error);
        const errorMsg = error?.name ||
            error?.message ||
            'Unknown error occurred while creating Razorpay order';
        throw new Error(`Error creating Razorpay order: ${errorMsg}`);
    }
    async verifyPayment(input, user) {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, planIds, amount, couponCode, duration, } = input;
        console.log('Razorpay Order ID:', razorpayOrderId);
        console.log('Razorpay Payment ID:', razorpayPaymentId);
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest('hex');
        console.log('Generated Signature:', generatedSignature);
        console.log('Razorpay Signature:', razorpaySignature);
        if (generatedSignature !== razorpaySignature) {
            throw new Error('Payment verification failed');
        }
        const plans = await this.planRepo.find({
            where: { id: (0, typeorm_2.In)(planIds) },
        });
        if (plans.length !== planIds.length) {
            throw new Error('One or more plans are invalid');
        }
        const subscription = this.subRepo.create({
            name: 'Subscription for ' + user.name + ' - ' + Date.now(),
            price: amount,
            duration: duration,
            couponCode: couponCode || null,
            status: 'active',
            paymentId: razorpayPaymentId,
            plans,
            userId: user?.id,
            organizationId: user?.organizationId,
        });
        await this.subRepo.save(subscription);
        return [subscription];
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Plan_1.Plan)),
    __param(1, (0, typeorm_1.InjectRepository)(Subscription_1.Subscriptions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map