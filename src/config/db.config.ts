import { Dialect } from 'sequelize';

export const DBConfig = {
  owgw: {
    dialect: 'sqlite' as Dialect,
    storage: './DB/owgw-data/persist/devices.db',
    models: ['./Models/owgw/*.model.ts'],
  },
};
