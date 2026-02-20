declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        sub: string;
        username: string;
    }): Promise<{
        id: string;
        email: string;
    }>;
}
export {};
