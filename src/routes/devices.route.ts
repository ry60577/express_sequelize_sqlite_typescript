import { Request, Response, Router } from 'express';
import DevicesModel from '../models/owgw/devices.model';

const devicesRouter = Router();

devicesRouter.get('/devices', async (req: Request, res: Response) => {
  const instance = await DevicesModel.findAll();
  return res.status(200).json(instance);
});

export default devicesRouter;
