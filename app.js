import express from 'express';
import cookieParser from 'cookie-parser';
import UsersRouter from './router/users.router.js';
import ResumesRouter from './router/Resumes.router.js';

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());

app.use('/api', [UsersRouter, ResumesRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸습니다.');
});
