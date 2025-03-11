import dbConfig from "../config/dbConfig.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

export class userModel extends Model {}

userModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: dbConfig,
    modelName: "user",
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
    hooks: {
      // Hook to hash password before creating user
      beforeCreate: async (userModel, options) => {
        userModel.password = await createHash(userModel.password);
      },

      // Hook to hash password before updating user
      beforeUpdate: async (userModel, options) => {
        if (userModel.changed("password")) {
          userModel.password = await createHash(userModel.password);
        }
      },
    },
  },
);

const createHash = async (string) => {
  try {
    // Genererer et salt for ekstra sikkerhed
    const salt = await bcrypt.genSalt(10);

    // Hasher strengen med saltet
    return await bcrypt.hash(string, salt);
  } catch (error) {
    // Smider en fejl, hvis hashing mislykkes
    throw new Error("Error hashing password");
  }
};
