"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Line_1 = __importDefault(require("./Line"));
let Constellation = class Constellation {
    constructor(obj) {
        this.name = (obj && obj.name) || '';
        this.description = (obj && obj.description) || '';
        this.lines = (obj && obj.lines) || undefined;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Constellation.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'name', type: 'varchar' }),
    class_validator_1.Length(2, 20),
    __metadata("design:type", String)
], Constellation.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'description', type: 'varchar' }),
    class_validator_1.Length(2, 100),
    __metadata("design:type", String)
], Constellation.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: 'created_at' }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Constellation.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(type => Line_1.default, line => line.constellation, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Constellation.prototype, "lines", void 0);
Constellation = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Constellation);
exports.default = Constellation;
