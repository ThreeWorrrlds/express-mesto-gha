import { rateLimit } from 'express-rate-limit';

import helmet from 'helmet';

import express from 'express';

import mongoose from 'mongoose';

import usersRoutes from './routes/users';

import cardsRoutes from './routes/cards';

const app = express();
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(helmet());
app.disable('x-powered-by');

app.use((req, res, next) => {
  req.user = {
    _id: '639db5782d3c577ab9f30a72',
  };
  next();
});

app.use(usersRoutes);
app.use(cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Не верен путь этот...' });
});

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await app.listen(PORT);
}

main();
