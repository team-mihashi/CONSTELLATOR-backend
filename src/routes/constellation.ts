import { Router } from 'express';

import ConstellationController from '../controllers/ConstellationController';

const router = Router();

// Get constellation data
router.get('/:id([0-9]+)', ConstellationController.getConstellations);

// Post constellation data
router.post('/', ConstellationController.postConstellation);

export default router;
