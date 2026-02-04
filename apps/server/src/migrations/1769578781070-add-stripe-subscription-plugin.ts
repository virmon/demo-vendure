import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStripeSubscriptionPlugin1769578781070 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_line" ADD "customFieldsSubscriptionids" text`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_line" DROP COLUMN "customFieldsSubscriptionids"`, undefined);
   }

}
