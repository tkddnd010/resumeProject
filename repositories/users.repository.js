export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createUser = async (email, clientId, hashedPassword, name, grade) => {
    let createdUser = {};
    if (clientId) {
      createdUser = await this.prisma.users.create({
        data: {
          clientId,
          name,
          grade,
        },
      });
    } else {
      createdUser = await this.prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          name,
          grade,
        },
      });
    }
    return createdUser;
  };

  findUser = async (clientId, email, refreshToken) => {
    let user = {};
    if (clientId) {
      user = await this.prisma.users.findFirst({
        where: { clientId },
      });
    } else {
      user = await this.prisma.users.findFirst({
        where: { email },
      });
    }

    return user;
  };

  createToken = async (user, refreshToken) => {
    await this.prisma.refreshTokens.create({
      data: { userId: user.userId, token: refreshToken },
    });
  };

  findUserInfo = async (userId) => {
    const userInfo = await this.prisma.users.findFirst({
      where: { userId: +userId },
    });

    return userInfo;
  };
}
