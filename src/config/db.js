import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "education_management",
  "postgres",
  "King#123",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false, 
  }
);

export const dbConnection = async () => {

  try {
    await sequelize.authenticate();
    console.log("Db Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
