import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

const forceDatabaseRefresh = false;

console.log('Environment Variables:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
console.log("TripAdvisor API key:", process.env.TRIPADVISOR_API_KEY);

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// serve static files after API routes
app.use(express.static('../client/dist'));

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
