import { MigrationInterface, QueryRunner } from "typeorm";

export class RevertCustomField1769502382108 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<any> {
          await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsIsbn"`, undefined);
     }

     public async down(queryRunner: QueryRunner): Promise<any> {
          await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsIsbn" character varying(255)`, undefined);
     }

}