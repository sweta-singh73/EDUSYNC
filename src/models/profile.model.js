import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "profiles",
    underscored: true,
    paranoid: true,
  }
);

export default Profile;
