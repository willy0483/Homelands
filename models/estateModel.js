import dbConfig from "../config/dbConfig.js";
import { DataTypes, Model } from "sequelize";
import { cityModel } from "./cityModel.js";
import { energyLabelModel } from "./energyLabelModel.js";
import { estateTypeModel } from "./estateTypeModel.js";

export class estateModel extends Model {}

estateModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    payout: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    gross: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    net: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    num_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    num_floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floor_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ground_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    basement_space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_construction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year_rebuilt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    floorplan: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    num_clicks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: cityModel,
        key: "id",
      },
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: estateTypeModel,
        key: "id",
      },
    },
    energy_label_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: energyLabelModel,
        key: "id",
      },
    },
  },
  {
    sequelize: dbConfig,
    modelName: "estate",
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
  },
);
