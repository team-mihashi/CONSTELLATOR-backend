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
const Constellation_1 = __importDefault(require("./Constellation"));
let Line = class Line {
    constructor(obj) {
        this.startX = obj && obj.startX;
        this.startY = obj && obj.startY;
        this.endX = obj && obj.endX;
        this.endY = obj && obj.endY;
        this.constellation = obj && obj.constellation;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Line.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'start_x', type: 'float' }),
    __metadata("design:type", Number)
], Line.prototype, "startX", void 0);
__decorate([
    typeorm_1.Column({ name: 'start_y', type: 'float' }),
    __metadata("design:type", Number)
], Line.prototype, "startY", void 0);
__decorate([
    typeorm_1.Column({ name: 'end_x', type: 'float' }),
    __metadata("design:type", Number)
], Line.prototype, "endX", void 0);
__decorate([
    typeorm_1.Column({ name: 'end_y', type: 'float' }),
    __metadata("design:type", Number)
], Line.prototype, "endY", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Constellation_1.default, constellation => constellation.lines),
    __metadata("design:type", Object)
], Line.prototype, "constellation", void 0);
Line = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Line);
exports.default = Line;
