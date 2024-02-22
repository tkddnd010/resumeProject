export class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }

  // 이력서 조회 API
  getResumes = async (req, res, next) => {
    try {
      const resumes = await this.resumesService.getResumes();

      return res.status(200).json({ data: resumes });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // 이력서 생성 API
  createResume = async (req, res, next) => {
    try {
      const { title, coment } = req.body;
      const { userId } = req.user;

      if (!title || !coment) throw new Error('필수 입력값을 입력해주세요.');

      const createdResume = await this.resumesService.createResume(
        title,
        coment,
        userId
      );

      return res.status(201).json({ data: createdResume });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // 이력서 상세 조회 API
  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      const resume = await this.resumesService.getResumeById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // 이력서 수정 API
  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { title, coment, status } = req.body;

      const updatedResume = await this.resumesService.updateResume(
        resumeId,
        title,
        coment,
        status
      );

      return res.status(200).json({ data: updatedResume });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // 이력서 삭제 API
  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { userId } = req.user;

      const deletedResume = await this.resumesService.deleteResume(
        resumeId,
        userId
      );

      return res.status(200).json({ data: deletedResume });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
}
