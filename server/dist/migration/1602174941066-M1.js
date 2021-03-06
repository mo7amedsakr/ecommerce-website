"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M11602174941066 = void 0;
class M11602174941066 {
    constructor() {
        this.name = 'M11602174941066';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "sizes" text array NOT NULL, "colors" text array NOT NULL, "images" text array NOT NULL, "price" numeric(6,2) NOT NULL, "quantity" integer NOT NULL, "description" text NOT NULL, "slug" character varying(50) NOT NULL, "discount_price" numeric(6,2) DEFAULT null, "collection" character varying(20) NOT NULL, CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224" UNIQUE ("slug"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "role" character varying(5) NOT NULL DEFAULT 'user', "inserted_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" smallint NOT NULL, "size" text NOT NULL, "color" text NOT NULL, CONSTRAINT "UQ_ddddd243a5286b326dcfc022590" UNIQUE ("user_id", "product_id", "size", "color"), CONSTRAINT "CHK_ad53c8f7d174209f2894b9c66c" CHECK ("quantity" > 0), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "total" numeric(10,2) NOT NULL, "inserted_at" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" smallint NOT NULL, "size" text NOT NULL, "color" text NOT NULL, CONSTRAINT "UQ_5dab149fe06247b7b580f5d9d5c" UNIQUE ("order_id", "product_id", "quantity", "size", "color"), CONSTRAINT "CHK_805e552e196a6b601ce77d042d" CHECK ("quantity" > 0), CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
exports.M11602174941066 = M11602174941066;
