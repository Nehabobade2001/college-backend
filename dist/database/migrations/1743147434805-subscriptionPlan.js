"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlan1743147434805 = void 0;
class SubscriptionPlan1743147434805 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE subscription_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        subscriptionId INT NOT NULL,
        planId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (subscriptionId) REFERENCES subscriptions (id) ON DELETE CASCADE,
        FOREIGN KEY (planId) REFERENCES plans (id) ON DELETE CASCADE
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE subscription_plans`);
    }
}
exports.SubscriptionPlan1743147434805 = SubscriptionPlan1743147434805;
//# sourceMappingURL=1743147434805-subscriptionPlan.js.map