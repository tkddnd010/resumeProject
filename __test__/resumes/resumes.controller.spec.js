import { expect, jest } from '@jest/globals';
import { ResumesController } from '../../controllers/resumes.controller';

const mockResumesService = {
  getResumes: jest.fn(),
  createResume: jest.fn(),
  getResumeById: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const resumesController = new ResumesController(mockResumesService);

describe('Resumes Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('getResumes Method by Success', async () => {
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
    mockResumesService.getResumes.mockReturnValue(sampleResumes);

    await resumesController.getResumes(mockRequest, mockResponse, mockNext);

    expect(mockResumesService.getResumes).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: sampleResumes,
    });
  });

  //   test('createResume Method by Success', async () => {
  //     const createRequestBodyParams = {
  //       title: 'Title_Success',
  //       coment: 'Coment_Success',
  //     };
  //     mockRequest.body = createRequestBodyParams;

  //     const createResumeReturnValue = {
  //       postId: 1,
  //       ...createRequestBodyParams,
  //       createdAt: new Date().toString(),
  //     };
  //     mockResumesService.createResume.mockReturnValue(createResumeReturnValue);

  //     const createResume = await resumesController.createResume(
  //       mockRequest,
  //       mockResponse,
  //       mockNext
  //     );

  //     expect(mockResumesService.createResume).toHaveBeenCalledTimes(1);
  //     expect(mockResumesService.createResume).toHaveBeenCalledWith(
  //       createRequestBodyParams.title,
  //       createRequestBodyParams.coment
  //     );

  //     expect(mockResponse.status).toHaveBeenCalledTimes(1);
  //     expect(mockResponse.status).toHaveLastReturnedWith(201);

  //     expect(mockResponse.json).toBeCalledTimes(1);
  //     expect(mockResponse.json).toBeCalledWith({
  //       data: createResumeReturnValue,
  //     });
  //   });
});
