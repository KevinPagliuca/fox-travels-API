import { Injectable, BadRequestException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateUserInput, UserAuthInput } from '../../inputs/user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  private generateUserToken(userId: string) {
    return sign({}, process.env.TOKEN_SECRET, {
      subject: userId,
      expiresIn: '1d',
    });
  }

  private async validateCredentials(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const passwordIsValid = await this.validatePassword(password, user.password);

    if (!passwordIsValid) throw new BadRequestException('Invalid credentials');

    delete user.password;

    return { user, token: this.generateUserToken(user.id) };
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser({ email, name, password, confirmPassword }: CreateUserInput) {
    if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
      throw new BadRequestException('The passwords must be the same!');
    }

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const createdUser = await this.prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    delete createdUser.password;

    return {
      token: this.generateUserToken(createdUser.id),
      user: createdUser,
    };
  }

  async userAuth({ email, password }: UserAuthInput) {
    const { user, token } = await this.validateCredentials(email, password);

    return {
      token,
      user,
    };
  }
}
