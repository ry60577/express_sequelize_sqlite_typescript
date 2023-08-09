import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelizeConnection from '../index';

class Devices extends Model<InferAttributes<Devices>, InferCreationAttributes<Devices>> {
  declare SerialNumber: string;
  declare DeviceType: string;
  declare MACAddress: string;
  declare Manufacturer: string;
  declare Configuration: string;
  declare Notes: string;
  declare Owner: string;
  declare Location: string;
  declare Venue: string;
  declare DevicePassword: string;
  declare Firmware: string;
  declare Compatible: string;
  declare FWUpdatePolicy: string;
  declare UUID: number;
  declare CreationTimestamp: number;
  declare LastConfigurationChange: number;
  declare LastConfigurationDownload: number;
  declare LastFWUpdate: number;
  declare subscriber: string;
  declare entity: string;
  declare modified: number;
  declare locale: string;
  declare onboard: 0 | 1 | 2;
  declare latestFirmwareAvailable: number;
  declare latestFirmwareURI: string;
}

const DevicesModel = Devices.init(
  {
    SerialNumber: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    DeviceType: {
      type: DataTypes.STRING,
    },
    MACAddress: {
      type: DataTypes.STRING,
    },
    Manufacturer: {
      type: DataTypes.STRING,
    },
    Configuration: {
      type: DataTypes.STRING,
    },
    Notes: {
      type: DataTypes.STRING,
    },
    Owner: {
      type: DataTypes.STRING,
    },
    Location: {
      type: DataTypes.STRING,
    },
    Venue: {
      type: DataTypes.STRING,
    },
    DevicePassword: {
      type: DataTypes.STRING,
    },
    Firmware: {
      type: DataTypes.STRING,
    },
    Compatible: {
      type: DataTypes.STRING,
    },
    FWUpdatePolicy: {
      type: DataTypes.STRING,
    },
    UUID: {
      type: DataTypes.BIGINT,
    },
    CreationTimestamp: {
      type: DataTypes.BIGINT,
    },
    LastConfigurationChange: {
      type: DataTypes.BIGINT,
    },
    LastConfigurationDownload: {
      type: DataTypes.BIGINT,
    },
    LastFWUpdate: {
      type: DataTypes.BIGINT,
    },
    subscriber: {
      type: DataTypes.STRING,
    },
    entity: {
      type: DataTypes.STRING,
    },
    modified: {
      type: DataTypes.BIGINT,
    },
    locale: {
      type: DataTypes.STRING,
    },
    onboard: {
      type: DataTypes.INTEGER,
    },
    latestFirmwareAvailable: {
      type: DataTypes.BIGINT,
    },
    latestFirmwareURI: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, sequelize: sequelizeConnection }
);

export default DevicesModel;
