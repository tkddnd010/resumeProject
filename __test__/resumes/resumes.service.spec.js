import { jest } from '@jest/globals';
import { ResumesService } from '../../services/resumes.service';

let mockResumesRepository = {
  getResumes: jest.fn(),
  createResume: jest.fn(),
  getResumeById: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

let resumesService = new ResumesService(mockResumesRepository);

describe('Posts Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('getResumes Method', async () => {
    const sampleResumes = [
      {
        resumeId: 1,
        title: '제목입니',
        coment: '자기소개',
        status: 'PASS',
        createdAt: '2024-02-20T13:56:48.431Z',
      },
      {
        resumeId: 2,
        title: '제목입니',
        coment: '자기소개',
        status: 'PASS',
        createdAt: '2024-02-21T13:56:48.431Z',
      },
    ];
    mockResumesRepository.getResumes.mockReturnValue(sampleResumes);

    const Resumes = await resumesService.getResumes();

    expect(Resumes).toEqual(
      sampleResumes.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );

    expect(mockResumesRepository.getResumes).toHaveBeenCalledTimes(1);
  });

  test('createResume Method', async () => {
    const sampleResume = {
      resumeId: 1,
      title: '이력서제목입니다',
      coment: '자기소개글입니다.',
      createdAt: '2024-02-20T13:56:48.431Z',
    };
    mockResumesRepository.createResume.mockReturnValue(sampleResume);

    const createResume = await resumesService.createResume(
      '이력서제목입니다',
      '자기소개글입니다.',
      1
    );

    expect(mockResumesRepository.createResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.createResume).toHaveBeenCalledWith(
      sampleResume.title,
      sampleResume.coment,
      1
    );

    expect(createResume).toEqual({
      resumeId: sampleResume.resumeId,
      title: sampleResume.title,
      coment: sampleResume.coment,
      createdAt: sampleResume.createdAt,
    });
  });

  test('getResumeById Method', async () => {
    const sampleResume = {
      resumeId: 1,
      title: '제목입니다',
      coment: '자기소개',
      status: 'PASS',
      createdAt: '2024-02-20T13:56:48.431Z',
      user: { name: '얌얌이' },
    };
    mockResumesRepository.getResumeById.mockReturnValue(sampleResume);

    const Resume = await resumesService.getResumeById(1);

    expect(mockResumesRepository.getResumeById).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.getResumeById).toHaveBeenCalledWith(
      sampleResume.resumeId
    );

    expect(Resume).toEqual({
      resumeId: sampleResume.resumeId,
      title: sampleResume.title,
      coment: sampleResume.coment,
      status: sampleResume.status,
      createdAt: sampleResume.createdAt,
      name: sampleResume.user.name,
    });
  });

  test('updateResume Method', async () => {
    const sampleResume = {
      resumeId: 1,
      title: '수정된 제목',
      coment: '수정 소개',
      status: 'PASS',
      createdAt: '2024-02-20T13:56:48.431Z',
      user: { name: '얌얌이' },
    };
    mockResumesRepository.updateResume.mockReturnValue(sampleResume);
    mockResumesRepository.getResumeById.mockReturnValue(sampleResume);

    const updateResume = await resumesService.updateResume(
      1,
      '수정된 제목',
      '수정 소개',
      'PASS'
    );

    expect(mockResumesRepository.getResumeById).toHaveBeenCalledTimes(2);
    expect(mockResumesRepository.getResumeById).toHaveBeenCalledWith(
      sampleResume.resumeId
    );

    expect(mockResumesRepository.updateResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.updateResume).toHaveBeenCalledWith(
      sampleResume.resumeId,
      sampleResume.title,
      sampleResume.coment,
      sampleResume.status
    );

    expect(updateResume).toEqual({
      resumeId: sampleResume.resumeId,
      title: sampleResume.title,
      coment: sampleResume.coment,
      status: sampleResume.status,
      createdAt: sampleResume.createdAt,
      name: sampleResume.user.name,
    });
  });

  test('deleteResume Method', async () => {
    const sampleResume = {
      resumeId: 1,
      title: '제목',
      coment: '소개글',
      status: 'PASS',
      createdAt: '2024-02-20T13:56:48.431Z',
      user: { name: '얌얌이' },
    };
    mockResumesRepository.deleteResume.mockReturnValue(sampleResume);
    mockResumesRepository.getResumeById.mockReturnValue(sampleResume);

    const deleteResume = await resumesService.deleteResume(1, 1);

    expect(mockResumesRepository.getResumeById).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.getResumeById).toHaveBeenCalledWith(
      sampleResume.resumeId
    );

    expect(mockResumesRepository.deleteResume).toHaveBeenCalledTimes(1);
    expect(mockResumesRepository.deleteResume).toHaveBeenCalledWith(
      sampleResume.resumeId,
      1
    );

    expect(deleteResume).toEqual({
      resumeId: sampleResume.resumeId,
      title: sampleResume.title,
      coment: sampleResume.coment,
      status: sampleResume.status,
      createdAt: sampleResume.createdAt,
      name: sampleResume.user.name,
    });
  });

  test('updateResume Method By Not Found Post Error', async () => {
    const sampleResume = null;
    mockResumesRepository.getResumeById.mockReturnValue(sampleResume);

    try {
      await resumesService.updateResume(1, '수정된 제목', '수정 소개', 'PASS');
    } catch (err) {
      expect(mockResumesRepository.getResumeById).toHaveBeenCalledTimes(1);
      expect(mockResumesRepository.getResumeById).toHaveBeenCalledWith(1);

      expect(mockResumesRepository.deleteResume).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual('존재하지 않는 이력서입니다.');
    }
  });

  test('deleteResume Method By Not Found Post Error', async () => {
    const samplePost = null;
    mockResumesRepository.getResumeById.mockReturnValue(samplePost);

    try {
      await resumesService.deleteResume(1, 1);
    } catch (err) {
      expect(mockResumesRepository.getResumeById).toHaveBeenCalledTimes(1);
      expect(mockResumesRepository.getResumeById).toHaveBeenCalledWith(1);

      expect(mockResumesRepository.deleteResume).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual('존재하지 않는 이력서입니다.');
    }
  });
});
