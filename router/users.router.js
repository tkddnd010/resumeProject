import express from 'express';
import { prisma } from '../model/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/need-signin-middleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// 회원가입 API
router.post('/sign-up', async (req, res, next) => {
  try {
    const { email, password, repassword, name } = req.body;

    const isExistUser = await prisma.users.findFirst({
      where: { email },
    });
    if (isExistUser)
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    if (!(password.length >= 6))
      return res
        .status(400)
        .json({ message: '비밀번호는 6자리 이상을 입력해주세요' });
    if (password !== repassword)
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { email, password: hashedPassword, name },
    });

    const finishUser = await prisma.users.findFirst({
      where: { email },
      select: {
        userId: true,
        email: true,
        name: true,
      },
    });

    return res.status(201).json({ data: finishUser });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// 로그인 API
router.post('/sign-in', async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.users.findFirst({
    where: { email },
  });
  if (!user)
    return res.status(401).json({ message: '존재하지 않는 이메일입니다' });
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SecretKey);

  res.cookie('authorization', `Bearer ${token}`, { expiresln: '12h' });
  return res.json({ message: '로그인 성공' });
});

// 내 정보 조회 API
router.get('/user', authMiddleware, async (req, res, next) => {
  const { userId } = req.user;

  const user = await prisma.users.findFirst({
    where: { userId: +userId },
    select: {
      userId: true,
      email: true,
      name: true,
    },
  });
  return res.status(200).json({ data: user });
});

export default router;
