import CardModel from '../models/Card';

export const getCards = async (req, res) => {
  try {
    const cards = await CardModel.find({});
    if (cards) {
      res.status(200).send(cards);
    } else {
      res.status(404).send({ message: 'Карточки не найдены' });
    }
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка: ${err.name} текст ошибки: ${err.message}` });
  }
};

export const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const id = req.user._id;
    const newCard = await CardModel.create({ name, link, owner: id });
    res.status(201).send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные для создания карточки' });
    } else {
      res.status(500).send({ message: `Произошла ошибка: ${err.name} текст ошибки: ${err.message}` });
    }
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const cardOfDel = await CardModel.findByIdAndRemove(req.params.cardId);
    res.status(200).send(cardOfDel);
  } catch (err) {
    if (err.name === 'NotFound') {
      res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(500).send({ message: `Произошла ошибка: ${err.name} текст ошибки: ${err.message}` });
    }
  }
};

export const setLikeByCardId = async (req, res) => {
  try {
    await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).populate('likes').then((responce) => res.send({ data: responce }));
  } catch (err) {
    if (err.name === 'NotFound') {
      res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(500).send({ message: `Произошла ошибка: ${err.name} текст ошибки: ${err.message}` });
    }
  }
};

export const unsetLikeByCardId = async (req, res) => {
  try {
    await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).populate('likes').then((responce) => res.send({ data: responce }));
  } catch (err) {
    if (err.name === 'NotFound') {
      res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(500).send({ message: `Произошла ошибка: ${err.name} текст ошибки: ${err.message}` });
    }
  }
};
