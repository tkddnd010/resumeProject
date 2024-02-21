export class ResumesRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getResumes = async () => {
    const resumes = await this.prisma.resumes.findMany();

    return resumes;
  };

  createResume = async (title, coment, userId) => {
    const createdResume = await this.prisma.resumes.create({
      data: {
        title,
        coment,
        userId,
      },
    });
    return createdResume;
  };

  getResumeById = async (resumeId) => {
    const resume = await this.prisma.resumes.findFirst({
      where: { resumeId: +resumeId },
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

    return resume;
  };

  updateResume = async (resumeId, title, coment, status) => {
    const updatedResume = await this.prisma.resumes.update({
      where: { resumeId: +resumeId },
      data: {
        title,
        coment,
        status,
      },
    });
    return updatedResume;
  };

  deleteResume = async (resumeId, userId) => {
    const deletedResume = await this.prisma.resumes.delete({
      where: { resumeId: +resumeId, userId: +userId },
    });

    return deletedResume;
  };
}
