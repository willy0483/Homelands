import dbConfig from "../config/dbConfig.js";
import { DataTypes, Model } from "sequelize";

import { userModel } from "./userModel.js";
import { estateModel } from "./estateModel.js";

export class favoriteModel extends Model {}

favoriteModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModel,
        key: "id",
      },
    },
    estate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: estateModel,
        key: "id",
      },
    },
  },
  {
    sequelize: dbConfig,
    modelName: "favorite",
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
  },
);
