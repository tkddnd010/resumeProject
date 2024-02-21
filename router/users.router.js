import express from 'express';
import { prisma } from '../model/index.js';
import { UsersController } from '../controllers/users.controller.js';
import { UsersService } from '../services/users.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import loginMiddleware from '../middlewares/need-signin-middleware.js';
import authMiddleware from '../middlewares/autho-middelwares.js';

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

// 회원가입 API
router.post('/sign-up', usersController.signUpUser);

// 로그인 API
router.post('/sign-in', usersController.signInUser);

// 내 정보 조회 API
router.get('/user', authMiddleware, loginMiddleware, usersController.getUser);

export default router;
