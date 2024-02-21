import express from 'express';
import { prisma } from '../model/index.js';
import { ResumesController } from '../controllers/resumes.controller.js';
import { ResumesService } from '../services/resumes.service.js';
import { ResumesRepository } from '../repositories/resumes.repository.js';
import loginMiddleware from '../middlewares/need-signin-middleware.js';
import authMiddleware from '../middlewares/autho-middelwares.js';

const router = express.Router();

const resumesRepository = new ResumesRepository(prisma);
const resumesService = new ResumesService(resumesRepository);
const resumesController = new ResumesController(resumesService);

// 이력서 생성 API
router.post(
  '/resumes',
  authMiddleware,
  loginMiddleware,
  resumesController.createResume
);

// 이력서 목록 조회 API
router.get('/resumes', resumesController.getResumes);

// 이력서 상세 조회 API
router.get('/resumes/:resumeId', resumesController.getResumeById);

// 이력서 수정 API
router.put(
  '/resumes/:resumeId',
  authMiddleware,
  loginMiddleware,
  resumesController.updateResume
);

// 이력서 삭제 API
router.delete(
  '/resumes/:resumeId',
  authMiddleware,
  loginMiddleware,
  resumesController.deleteResume
);

export default router;
