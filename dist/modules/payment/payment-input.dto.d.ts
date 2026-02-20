export declare class VerifyPaymentInput {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    planIds: number[];
    couponCode?: string | null;
    duration: number;
    amount: number;
}
