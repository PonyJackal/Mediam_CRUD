import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    delete result.password;
    return result;
  }

  async findOne(id: number): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({ where: { id } });
    delete result.password;
    return result;
  }

  async findByName(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async update(id: number, username: string): Promise<User | undefined> {
    const result = await this.prisma.user.update({
      where: { id },
      data: { username },
    });
    delete result.password;
    return result;
  }
}
