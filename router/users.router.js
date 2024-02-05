import express from 'express';
import { prisma } from '../model/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginMiddleware from '../middlewares/need-signin-middleware.js';
import dotenv from 'dotenv';
import authMiddleware from '../middlewares/autho-middelwares.js';

dotenv.config();

const router = express.Router();

// 회원가입 API
router.post('/sign-up', async (req, res, next) => {
  try {
    const { email, clientId, password, repassword, name, grade } = req.body;
    if (grade && !['user', 'admin'].includes(grade)) {
      return res
        .status(400)
        .json({ message: '등급이 올바르지 않습니다.(필수값)' });
    }
    if (!clientId) {
      if (!(password.length >= 6))
        return res
          .status(400)
          .json({ message: '비밀번호는 6자리 이상을 입력해주세요' });
      if (password !== repassword)
        return res
          .status(400)
          .json({ message: '비밀번호가 일치하지 않습니다' });
    }
    if (clientId) {
      const user = await prisma.users.findFirst({
        where: { clientId },
      });
      if (user)
        return res.status(400).json({ message: '이미 가입된 사용자 입니다.' });
      await prisma.users.create({
        data: { clientId, name, grade },
      });
    } else {
      const isExistUser = await prisma.users.findFirst({
        where: { email },
      });
      if (isExistUser)
        return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.users.create({
        data: { email, password: hashedPassword, name, grade },
      });
    }

    return res.status(201).json({ email, name });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// 로그인 API
router.post('/sign-in', async (req, res, next) => {
  const { clientId, email, password } = req.body;
  let user;
  if (clientId) {
    user = await prisma.users.findFirst({
      where: { clientId },
    });
    if (!user)
      return res.status(404).json({ message: '존재하지 않는 이메일입니다' });
  } else {
    user = await prisma.users.findFirst({
      where: { email },
    });
    if (!user)
      return res.status(404).json({ message: '존재하지 않는 이메일입니다' });
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
  }

  const accessToken = jwt.sign(
    { userId: user.userId },
    process.env.ACCESS_SecretKey,
    { expiresIn: '12h' }
  );
  const refreshToken = jwt.sign(
    { userId: user.userId },
    process.env.REFRESH_SecretKey,
    { expiresIn: '7d' }
  );

  await prisma.refreshTokens.create({
    data: { userId: user.userId, token: refreshToken },
  });
  res.cookie('authorization', `Bearer ${accessToken}`);
  res.cookie('refresh', refreshToken);

  return res.json({ message: '로그인 성공' });
});

// 내 정보 조회 API
router.get('/user', authMiddleware, loginMiddleware, async (req, res, next) => {
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
