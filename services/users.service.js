import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  createUser = async (email, clientId, password, repassword, name, grade) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await this.usersRepository.createUser(
      email,
      clientId,
      hashedPassword,
      name,
      grade
    );

    if (clientId) {
      return {
        userId: createUser.userId,
        clientId: createUser.clientId,
        name: createUser.name,
      };
    } else {
      return {
        userId: createUser.userId,
        email: createUser.email,
        name: createUser.name,
      };
    }
    // return {
    //   userId: createUser.userId,
    //   email: createUser.email,
    //   clientId: createUser.clientId,
    //   name: createUser.name,
    // };
  };

  findUser = async (clientId, email, password) => {
    const user = await this.usersRepository.findUser(clientId, email);
    if (!user) {
      throw new Error('존재하지 않는 사용자입니다.');
    }
    if (!(await bcrypt.compare(password, user.password)))
      throw new Error('비밀번호가 일치하지 않습니다.');

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

    await this.usersRepository.createToken(user, refreshToken);

    return {
      userId: user.userId,
      email: user.email,
      clientId: user.clientId,
      name: user.name,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };

  findUserInfo = async (userId) => {
    const userInfo = await this.usersRepository.findUserInfo(userId);
    if (!userInfo) throw new Error('존재하지 않는 사용자입니다.');

    return {
      userId: userInfo.userId,
      email: userInfo.email,
      clientId: userInfo.clientId,
      name: userInfo.name,
    };
  };
}
