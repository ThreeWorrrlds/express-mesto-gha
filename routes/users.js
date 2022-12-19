import express from 'express';

import {
  getUsers, getUserById, createUser, updateUserInfo, updateUserAvatar,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);

usersRoutes.get('/users/:id', getUserById);

usersRoutes.post('/users', express.json(), createUser);

usersRoutes.patch('/users/me', express.json(), updateUserInfo);

usersRoutes.patch('/users/me/avatar', express.json(), updateUserAvatar);

export default usersRoutes;
