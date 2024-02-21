export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  // 회원가입 API
  signUpUser = async (req, res, next) => {
    try {
      const { email, clientId, password, repassword, name, grade } = req.body;
      //   const createuser = {};

      if (!name) {
        return res.status(400).json({ message: '필수 입력값을 입력해주세요' });
      }
      if (password !== repassword) {
        return res
          .status(400)
          .json({ message: '비밀번호가 일치하지 않습니다.' });
      }

      const createduser = await this.usersService.createUser(
        email,
        clientId,
        password,
        repassword,
        name,
        grade
      );

      return res.status(201).json({ data: createduser });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // 로그인 API
  signInUser = async (req, res, next) => {
    try {
      const { clientId, email, password } = req.body;

      const user = await this.usersService.findUser(clientId, email, password);

      res.cookie('authorization', `Bearer ${user.accessToken}`);
      res.cookie('refresh', user.refreshToken);

      return res.status(200).json({ message: '로그인 성공' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // 내 정보 조회 API
  getUser = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const userInfo = await this.usersService.findUserInfo(userId);

      return res.status(200).json({ data: userInfo });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
}
