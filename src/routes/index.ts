import { Router, Request, Response } from 'express';

// import routers
import constellationRouter from './constellation';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('ok');
});

router.use('/constellations', constellationRouter);

export default router;
