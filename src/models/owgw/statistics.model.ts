import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelizeConnection from '../index';

class Statistics extends Model<InferAttributes<Statistics>, InferCreationAttributes<Statistics>> {
  declare SerialNumber: string;
  declare UUID: number;
  declare Data: string;
  declare Recorded: number;
}

const StatisticsModel = Statistics.init(
  {
    SerialNumber: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    UUID: {
      type: DataTypes.INTEGER,
    },
    Data: {
      type: DataTypes.TEXT,
    },
    Recorded: {
      type: DataTypes.BIGINT,
    },
  },
  { timestamps: false, sequelize: sequelizeConnection }
);

export default StatisticsModel;
