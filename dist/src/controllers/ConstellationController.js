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
const typeorm_1 = require("typeorm");
const Constellation_1 = __importDefault(require("../entities/Constellation"));
const Line_1 = __importDefault(require("../entities/Line"));
class ConstellationController {
}
ConstellationController.getConstellations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get constellations as params
    const constellationNum = parseInt(req.params.id);
    if (!constellationNum) {
        throw res.send(400).send('No paramters.');
    }
    const constellationRepositry = typeorm_1.getRepository(Constellation_1.default);
    let constellations = [];
    try {
        constellations = yield constellationRepositry.find({
            take: constellationNum,
            join: {
                alias: 'constellation',
                leftJoinAndSelect: {
                    lines: 'constellation.lines',
                },
            },
        });
    }
    catch (e) {
        return res.status(401).send('Could not find constellations.');
    }
    return res.status(201).send({ constellations: constellations });
});
ConstellationController.postConstellation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get paramters from the body
    const { lines, name, description } = req.body;
    if (!(lines && name && description)) {
        throw res.status(400).send('Lines or name or description invalid.');
    }
    // Create constellation and line repositories
    const constellation = {
        name: name,
        description: description,
    };
    const constellationRepository = typeorm_1.getRepository(Constellation_1.default);
    yield typeorm_1.getManager().transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        let savedConstellation;
        try {
            savedConstellation = yield constellationRepository.save(constellation);
        }
        catch (e) {
            throw res.status(401).send('Could not create constellation.');
        }
        const lineRepository = typeorm_1.getRepository(Line_1.default);
        for (let i = 0; i < lines.length; i++) {
            const line = {
                startX: lines[i].start.x,
                startY: lines[i].start.y,
                endX: lines[i].end.x,
                endY: lines[i].end.y,
                constellation: savedConstellation,
            };
            try {
                yield lineRepository.save(line);
            }
            catch (e) {
                throw res.status(401).send('Could not create lines.');
            }
        }
    }));
    return res.status(201).send('Success!');
});
exports.default = ConstellationController;
