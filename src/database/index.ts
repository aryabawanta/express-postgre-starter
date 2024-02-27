import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

let sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USERNAME as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT as unknown as number,
    dialect: "postgres",
  }
);

const database: any = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.users = require("./models/users")(sequelize, Sequelize);

/** Relationship */
database.users.associate(database);
/** End Relationship */

export default database;
