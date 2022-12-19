import express from 'express';

import * as dotenv from 'dotenv';

import mongoose from 'mongoose';

import usersRoutes from './routes/users';

import cardsRoutes from './routes/cards';

dotenv.config();

const app = express();
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '639db5782d3c577ab9f30a72',
  };
  next();
});

app.use(usersRoutes);
app.use(cardsRoutes);

async function main() {
  await mongoose.connect(MONGO_URL, {});
  await app.listen(PORT);
}
main();
