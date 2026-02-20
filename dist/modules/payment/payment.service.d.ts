import { Plan } from '@/entities/Plan';
import { Subscriptions } from '@/entities/Subscription';
import { User } from '@/entities/User';
import { Repository } from 'typeorm';
import { VerifyPaymentInput } from './payment-input.dto';
export declare class PaymentService {
    private planRepo;
    private subRepo;
    private razorpay;
    constructor(planRepo: Repository<Plan>, subRepo: Repository<Subscriptions>);
    createMultipleOrder(planIds: number[], amount: number, duration: number, couponCode: string, user: User): Promise<{
        id: string;
        amount: string | number;
        currency: string;
        status: "created" | "attempted" | "paid";
        created_at: number;
        receipt: string;
        duration: number;
        couponCode: string;
        entity: string;
        amount_paid: number;
        amount_due: number;
        attempts: number;
        description: string;
        token: import("razorpay/dist/types/tokens").Tokens.RazorpayAuthorizationToken;
        payments?: {
            [key: string]: string;
        };
        offers?: {
            [key: string]: string;
        };
        transfers?: {
            entity: string;
            count: string;
            items: import("razorpay/dist/types/transfers").Transfers.RazorpayTransfer[];
        } | import("razorpay/dist/types/transfers").Transfers.RazorpayTransfer[];
        offer_id?: string | null;
        bank_account?: import("razorpay/dist/types/orders").Orders.RazorpayOrderBankDetailsCreateRequestBody;
        partial_payment?: boolean;
        first_payment_min_amount?: number;
        method?: "netbanking" | "upi" | "card" | "emandate" | "nach";
        notes?: import("razorpay/dist/types/api").IMap<string | number>;
        rto_review?: boolean;
        line_items?: import("razorpay/dist/types/orders").Orders.LineItems[];
        line_items_total?: number | string;
        shipping_fee?: number;
        cod_fee?: number;
        customer_details?: import("razorpay/dist/types/orders").Orders.CustomerDetails;
        promotions?: import("razorpay/dist/types/orders").Orders.Promotion[];
        device_details?: import("razorpay/dist/types/orders").Orders.DeviceDetails;
        phonepe_switch_context?: string;
    }>;
    catch(error: Error): void;
    verifyPayment(input: VerifyPaymentInput, user: User): Promise<Subscriptions[]>;
}
