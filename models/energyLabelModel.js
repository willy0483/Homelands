import dbConfig from "../config/dbConfig.js";
import { DataTypes, Model } from "sequelize";

export class energyLabelModel extends Model {}

energyLabelModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: dbConfig,
    modelName: "energy_label",
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
  },
);
