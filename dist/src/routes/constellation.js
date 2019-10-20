"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ConstellationController_1 = __importDefault(require("../controllers/ConstellationController"));
const router = express_1.Router();
// Get constellation data
router.get('/:id([0-9]+)', ConstellationController_1.default.getConstellations);
// Post constellation data
router.post('/', ConstellationController_1.default.postConstellation);
exports.default = router;
