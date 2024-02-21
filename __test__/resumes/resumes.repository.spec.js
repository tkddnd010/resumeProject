import { jest } from '@jest/globals';
import { ResumesRepository } from '../../repositories/resumes.repository';

let mockPrisma = {
  resumes: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let resumesRepository = new ResumesRepository(mockPrisma);

describe('Posts Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('getResumes Method', async () => {
    const mockReturn = 'findMany String';
    mockPrisma.resumes.findMany.mockReturnValue(mockReturn);

    const resumes = await resumesRepository.getResumes();

    expect(resumes).toBe(mockReturn);

    expect(mockPrisma.resumes.findMany).toHaveBeenCalledTimes(1);
  });

  test('createResume Method', async () => {
    const mockReturn = 'create Resume Return String';
    mockPrisma.resumes.create.mockReturnValue(mockReturn);

    const createResumeParams = {
      title: 'createResumeTitle',
      coment: 'createResumeComent',
      userId: 'createResumeUserId',
    };

    const createResumeData = await resumesRepository.createResume(
      createResumeParams.title,
      createResumeParams.coment,
      createResumeParams.userId
    );
    expect(createResumeData).toEqual(mockReturn);

    expect(mockPrisma.resumes.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resumes.create).toHaveBeenCalledWith({
      data: {
        title: createResumeParams.title,
        coment: createResumeParams.coment,
        userId: createResumeParams.userId,
      },
    });
  });

  test('getResumeById Method', async () => {
    const mockReturn = 'findFirst String';
    mockPrisma.resumes.findFirst.mockReturnValue(mockReturn);

    const getResumeParams = {
      resumeId: 'getResumeResumeId',
    };

    const getResumeData = await resumesRepository.getResumeById(
      getResumeParams.resumeId
    );
    expect(getResumeData).toEqual(mockReturn);

    expect(mockPrisma.resumes.findFirst).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resumes.findFirst).toHaveBeenCalledWith({
      where: { resumeId: +getResumeParams.resumeId },
      select: {
        resumeId: true,
        title: true,
        coment: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  });

  test('updateResume Method', async () => {
    const mockReturn = 'update Resume Return String';
    mockPrisma.resumes.update.mockReturnValue(mockReturn);

    const updateResumeParams = {
      resumeId: 'updateResumeId',
      title: 'updateTitle',
      coment: 'updateComent',
      status: 'updateStatus',
    };

    const updateResumeData = await resumesRepository.updateResume(
      updateResumeParams.resumeId,
      updateResumeParams.title,
      updateResumeParams.coment,
      updateResumeParams.status
    );
    expect(updateResumeData).toEqual(mockReturn);

    expect(mockPrisma.resumes.update).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resumes.update).toHaveBeenCalledWith({
      where: { resumeId: +updateResumeParams.resumeId },
      data: {
        title: updateResumeParams.title,
        coment: updateResumeParams.coment,
        status: updateResumeParams.status,
      },
    });
  });

  test('deleteResume Method', async () => {
    const mockReturn = 'delete Resume Return String';
    mockPrisma.resumes.delete.mockReturnValue(mockReturn);

    const deleteResumeParams = {
      resumeId: 'deleteResumeId',
      userId: 'deleteUserId',
    };

    const deleteResumeData = await resumesRepository.deleteResume(
      deleteResumeParams.resumeId,
      deleteResumeParams.userId
    );
    expect(deleteResumeData).toEqual(mockReturn);

    expect(mockPrisma.resumes.delete).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resumes.delete).toHaveBeenCalledWith({
      where: {
        resumeId: +deleteResumeParams.resumeId,
        userId: +deleteResumeParams.userId,
      },
    });
  });
});
