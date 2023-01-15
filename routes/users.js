import express from 'express';

import { validateUserId, validateUserUpdateInfo, validateUserUpdateAvatar } from '../middlewares/validatons';

import {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getCurrentUser,
} from '../controllers/users';

const usersRoutes = express.Router();

usersRoutes.get('/users/me', getCurrentUser);

usersRoutes.get('/users', getUsers);

usersRoutes.get('/users/:id', validateUserId, getUserById);

usersRoutes.patch('/users/me', express.json(), validateUserUpdateInfo, updateUserInfo);

usersRoutes.patch('/users/me/avatar', express.json(), validateUserUpdateAvatar, updateUserAvatar);

export default usersRoutes;
