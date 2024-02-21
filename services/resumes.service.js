export class ResumesService {
  constructor(resumesRepository) {
    this.resumesRepository = resumesRepository;
  }

  getResumes = async () => {
    const resumes = await this.resumesRepository.getResumes();

    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return resumes.map((resume) => {
      return {
        resumeId: resume.resumeId,
        title: resume.title,
        coment: resume.coment,
        status: resume.status,
        createdAt: resume.createdAt,
      };
    });
  };

  createResume = async (title, coment, userId) => {
    const createdResume = await this.resumesRepository.createResume(
      title,
      coment,
      userId
    );

    return {
      resumeId: createdResume.resumeId,
      title: createdResume.title,
      coment: createdResume.coment,
      createdAt: createdResume.createdAt,
    };
  };

  getResumeById = async (resumeId) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);

    return {
      resumeId: resume.resumeId,
      title: resume.title,
      coment: resume.coment,
      status: resume.status,
      createdAt: resume.createdAt,
      name: resume.user.name,
    };
  };

  updateResume = async (resumeId, title, coment, status) => {
    const resume = await this.resumesRepository.getResumeById(+resumeId);
    console.log(resume);
    if (!resume) throw new Error('존재하지 않는 이력서입니다.');

    await this.resumesRepository.updateResume(resumeId, title, coment, status);

    const updatedResume = await this.resumesRepository.getResumeById(resumeId);

    return {
      resumeId: updatedResume.resumeId,
      title: updatedResume.title,
      coment: updatedResume.coment,
      status: updatedResume.status,
      createdAt: updatedResume.createdAt,
      name: updatedResume.user.name,
    };
  };

  deleteResume = async (resumeId, userId) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);
    if (!resume) throw new Error('존재하지 않는 이력서입니다.');

    await this.resumesRepository.deleteResume(resumeId, userId);

    return {
      resumeId: resume.resumeId,
      title: resume.title,
      coment: resume.coment,
      status: resume.status,
      createdAt: resume.createdAt,
      name: resume.user.name,
    };
  };
}
