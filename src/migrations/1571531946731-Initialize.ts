import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1571531946731 implements MigrationInterface {
  name = 'Initialize1571531946731';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "line" ("id" SERIAL NOT NULL, "start_x" double precision NOT NULL, "start_y" double precision NOT NULL, "end_x" double precision NOT NULL, "end_y" double precision NOT NULL, "constellationId" integer, CONSTRAINT "PK_3d944a608f62f599dfe688ff2b1" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "constellation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b576aecb6f93648ca9915e14a5" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "line" ADD CONSTRAINT "FK_3894d06cc0083f6cfe7f18198c4" FOREIGN KEY ("constellationId") REFERENCES "constellation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "line" DROP CONSTRAINT "FK_3894d06cc0083f6cfe7f18198c4"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "constellation"`, undefined);
    await queryRunner.query(`DROP TABLE "line"`, undefined);
  }
}
