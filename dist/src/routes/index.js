"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import routers
const constellation_1 = __importDefault(require("./constellation"));
const router = express_1.Router();
router.use('/constellations', constellation_1.default);
exports.default = router;
