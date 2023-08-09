import { Router } from 'express';
import cbtTopologyRouter from './cbtTopology.route';
import devicesRouter from './devices.route';

const router = Router();

router.use('/', devicesRouter);
router.use('/', cbtTopologyRouter);

export default router;
