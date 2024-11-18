import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, password }: CreateUserDTO) {
    const userExists = await this.findByEmail(email);
    if (userExists) {
      throw new ConflictException('email já está sendo usado');
    }
    const passwordHashed = await bcrypt.hash(password, await bcrypt.genSalt());
    await this.prisma.users.create({
      data: {
        email,
        password: passwordHashed,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
