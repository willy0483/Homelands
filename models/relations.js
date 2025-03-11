import { cityModel } from "./cityModel.js";
import { energyLabelModel } from "./energyLabelModel.js";
import { estateModel } from "./estateModel.js";
import { estateTypeModel } from "./estateTypeModel.js";
import { favoriteModel } from "./favoriteModel.js";
import { userModel } from "./userModel.js";
import { imageModel } from "./imageModel.js";
import { estateImageRelModel } from "./estateImageRelModel.js";
import { reviewModel } from "./reviewModel.js";

export const setRelations = () => {
  estateModel.belongsTo(cityModel, {
    foreignKey: "city_id",
  });

  cityModel.hasMany(estateModel, {
    foreignKey: "city_id",
    onDelete: "CASCADE",
  });

  estateModel.belongsTo(energyLabelModel, {
    foreignKey: "energy_label_id",
  });

  energyLabelModel.hasMany(estateModel, {
    foreignKey: "energy_label_id",
    onDelete: "CASCADE",
  });

  estateModel.belongsTo(estateTypeModel, {
    foreignKey: "type_id",
  });

  estateTypeModel.hasMany(estateModel, {
    foreignKey: "type_id",
    onDelete: "CASCADE",
  });

  userModel.hasMany(favoriteModel, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  favoriteModel.belongsTo(userModel, {
    foreignKey: "user_id",
  });

  estateModel.hasMany(favoriteModel, {
    foreignKey: "estate_id",
    onDelete: "CASCADE",
  });

  favoriteModel.belongsTo(estateModel, {
    foreignKey: "estate_id",
  });

  estateModel.hasMany(estateImageRelModel, {
    foreignKey: "estate_id",
    onDelete: "CASCADE",
  });

  estateImageRelModel.belongsTo(estateModel, {
    foreignKey: "estate_id",
  });

  imageModel.hasMany(estateImageRelModel, {
    foreignKey: "image_id",
    onDelete: "CASCADE",
  });

  estateImageRelModel.belongsTo(imageModel, {
    foreignKey: "image_id",
  });

  estateModel.hasMany(reviewModel, {
    foreignKey: "estate_id",
    onDelete: "CASCADE",
  });

  reviewModel.belongsTo(estateModel, {
    foreignKey: "estate_id",
  });

  userModel.hasMany(reviewModel, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  reviewModel.belongsTo(userModel, {
    foreignKey: "user_id",
  });
};
