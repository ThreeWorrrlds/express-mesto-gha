import express from 'express';

import { validateUserData, validateUserId } from '../middlewares/validatons';

import {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getCurrentUser,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/users/me', getCurrentUser);

usersRoutes.get('/users', getUsers);

usersRoutes.get('/users/:id', validateUserId, getUserById);

usersRoutes.patch('/users/me', express.json(), validateUserData, updateUserInfo);

usersRoutes.patch('/users/me/avatar', express.json(), validateUserData, updateUserAvatar);

export default usersRoutes;
