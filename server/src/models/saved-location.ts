import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

interface SavedLocationAttributes {
  id: number;
  name: string;
  description: string;
  image: string;
  web_url: string;
}

interface SavedLocationCreationAttributes extends Optional<SavedLocationAttributes, 'id'> {}

export class SavedLocation extends Model<SavedLocationAttributes, SavedLocationCreationAttributes> implements SavedLocationAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public image!: string;
  public web_url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function SavedLocationFactory(sequelize: Sequelize): typeof SavedLocation {
  SavedLocation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      web_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'saved_locations',
      sequelize,
    }
  );

  return SavedLocation;
}
