"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Initialize1571531946731 {
    constructor() {
        this.name = 'Initialize1571531946731';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "line" ("id" SERIAL NOT NULL, "start_x" double precision NOT NULL, "start_y" double precision NOT NULL, "end_x" double precision NOT NULL, "end_y" double precision NOT NULL, "constellationId" integer, CONSTRAINT "PK_3d944a608f62f599dfe688ff2b1" PRIMARY KEY ("id"))`, undefined);
            yield queryRunner.query(`CREATE TABLE "constellation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b576aecb6f93648ca9915e14a5" PRIMARY KEY ("id"))`, undefined);
            yield queryRunner.query(`ALTER TABLE "line" ADD CONSTRAINT "FK_3894d06cc0083f6cfe7f18198c4" FOREIGN KEY ("constellationId") REFERENCES "constellation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "line" DROP CONSTRAINT "FK_3894d06cc0083f6cfe7f18198c4"`, undefined);
            yield queryRunner.query(`DROP TABLE "constellation"`, undefined);
            yield queryRunner.query(`DROP TABLE "line"`, undefined);
        });
    }
}
exports.Initialize1571531946731 = Initialize1571531946731;
