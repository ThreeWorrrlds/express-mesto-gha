import UserModel from '../models/User';

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(404).send({ message: 'Пользователи не найдены' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Ошибка', ...err });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Не валидный id', ...err });
    } else {
      res.status(500).send({ message: 'Ошибка', ...err });
    }
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await UserModel.create({ name, about, avatar });
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные при создании пользователя' });
    } else {
      res.status(500).send({ message: `Произошла ошибка: ${err.name} текст ошибки: ${err.message}` });
    }
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { name, about } = req.body;
    const newInfo = await UserModel.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true, upsert: false },
    );
    res.status(200).send(newInfo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные при обновлении профиля' });
    } else {
      res.status(500).send({ message: `Произошла ошибка: ${err.name} текст ошибки: ${err.message}` });
    }
  }
};

export const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const newAvatar = await UserModel.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true, upsert: false },
    );
    res.status(200).send(newAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные при обновлении аватара' });
    } else {
      res.status(500).send({ message: `Произошла ошибка: ${err.name} текст ошибки: ${err.message}` });
    }
  }
};
