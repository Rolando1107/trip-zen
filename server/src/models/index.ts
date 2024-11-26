import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import { UserFactory } from "./user.js";
import { SavedLocationFactory } from "./saved-location.js";

// db url for render deployment
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME || "your_db_name",
      process.env.DB_USER || "your_db_user",
      process.env.DB_PASSWORD || "your_db_password",
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

// init models
const User = UserFactory(sequelize);
const SavedLocation = SavedLocationFactory(sequelize);

// sync models with database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error creating database & tables:', error);
  });

// export all models

export { sequelize, User, SavedLocation };
