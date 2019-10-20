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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import util libraries
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
// Import DB libraries
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// Import routes and middlewares
const errorMiddleware_1 = __importDefault(require("./src/middlewares/errorMiddleware"));
const routes_1 = __importDefault(require("./src/routes"));
const app = express_1.default();
typeorm_1.createConnection().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // Set settings
    app.use(morgan_1.default('dev'));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use(cookie_parser_1.default());
    app.use(cors_1.default());
    app.use(helmet_1.default());
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use(errorMiddleware_1.default());
    app.use('/', routes_1.default);
}));
exports.default = app;
