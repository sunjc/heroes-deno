import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialData1598262813255 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    const DATA = Deno.readTextFileSync("resources/data.sql").split("\r\n");

    for (let sql of DATA) {
      if (sql.trim().length > 0) {
        await queryRunner.query(sql);
      }
    }
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("TRUNCATE TABLE hero");
  }
}
