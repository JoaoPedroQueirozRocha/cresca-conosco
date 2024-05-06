import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDescricaoToCargo1714955890630 implements MigrationInterface {
    name = 'ChangeDescricaoToCargo1714955890630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mao_de_obra" RENAME COLUMN "descricao" TO "cargo"`);
        await queryRunner.query(`ALTER TABLE "gestacoes" ADD "data_finalizacao" date`);
        await queryRunner.query(`ALTER TABLE "animais" ALTER COLUMN "lactante" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animais" ALTER COLUMN "lactante" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "gestacoes" DROP COLUMN "data_finalizacao"`);
        await queryRunner.query(`ALTER TABLE "mao_de_obra" RENAME COLUMN "cargo" TO "descricao"`);
    }

}
