import { Request, Response } from 'express';
import { getRepository, getManager } from 'typeorm';

import Constellation from '../entities/Constellation';
import Line from '../entities/Line';
import randomArray from '../utils/randomArray';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

class ConstellationController {
  static getConstellations = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    // Get constellations as params
    const constellationNum = parseInt(req.params.id);
    if (!constellationNum) {
      throw res.send(400).send('No paramters.');
    }
    const constellationRepositry = getRepository(Constellation);
    let constellations: Constellation[] = [];
    try {
      constellations = await constellationRepositry.find({
        join: {
          alias: 'constellation',
          leftJoinAndSelect: {
            lines: 'constellation.lines',
          },
        },
      });
    } catch (e) {
      return res.status(401).send('Could not find constellations.');
    }
    const returnConstellations = randomArray(constellations, constellationNum);
    return res.status(201).send({ constellations: returnConstellations });
  };

  static postConstellation = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    // Get paramters from the body
    const { name, description, lines } = req.body;
    if (!(lines && name && description)) {
      throw res.status(400).send('Lines or name or description invalid.');
    }

    // Validate request parameters
    if (name.length < 2 || 20 < name.length) {
      throw res.status(400).send('Name parameter is invalid.');
    }
    if (description.length < 2 || 100 < name.length) {
      throw res.status(400).send('Description paramter is invalid.');
    }
    if (lines.length < 2 || 10 < lines.length) {
      throw res.status(400).send('Lines parameters is invalid.');
    }

    // Create constellation and line repositories
    const constellation = {
      name: name,
      description: description,
    };
    const constellationRepository = getRepository(Constellation);
    await getManager().transaction(async transactionalEntityManager => {
      let savedConstellation!: Constellation;
      try {
        savedConstellation = await constellationRepository.save(constellation);
      } catch (e) {
        throw res.status(401).send('Could not create constellation.');
      }
      const lineRepository = getRepository(Line);
      for (let i = 0; i < lines.length; i++) {
        const line = {
          startX: lines[i].start.x,
          startY: lines[i].start.y,
          endX: lines[i].end.x,
          endY: lines[i].end.y,
          constellation: savedConstellation,
        };
        try {
          await lineRepository.save(line);
        } catch (e) {
          throw res.status(401).send('Could not create lines.');
        }
      }
    });
    return res.status(201).send('Success!');
  };
}

export default ConstellationController;
