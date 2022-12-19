import express from 'express';

import {
  getCards, createCard, deleteCardById, setLikeByCardId, unsetLikeByCardId,
} from '../controllers/cards';

const cardsRoutes = express.Router();

cardsRoutes.get('/cards', getCards);

cardsRoutes.post('/cards', express.json(), createCard);

cardsRoutes.delete('/cards/:cardId', express.json(), deleteCardById);

cardsRoutes.put('/cards/:cardId/likes', setLikeByCardId);

cardsRoutes.delete('/cards/:cardId/likes', unsetLikeByCardId);

export default cardsRoutes;
