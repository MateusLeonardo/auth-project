import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prismaService: PrismaService) {}
  async create(user: any, { name }: CreateBoardDto) {
    const existsBoard = await this.prismaService.boards.findFirst({
      where: {
        name,
        userBoards: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (existsBoard) {
      throw new ConflictException('Board já existe');
    }

    await this.prismaService.boards.create({
      data: {
        name,
        userBoards: {
          create: {
            userId: user.id,
          },
        },
      },
    });
  }

  async findAll(user: any) {
    return this.prismaService.boards.findMany({
      where: {
        userBoards: {
          some: {
            userId: user.id,
          },
        },
      },
    });
  }

  async findOne(user: any, id: string) {
    const board = await this.prismaService.boards.findFirst({
      where: {
        id,
        userBoards: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException('Board não encontrado');
    }

    return board;
  }

  async update(user: any, id: string, { name }: UpdateBoardDto) {
    const board = await this.prismaService.boards.findFirst({
      where: {
        id,
        userBoards: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundException('Board não encontrado');
    }

    const existingBoard = await this.prismaService.boards.findFirst({
      where: {
        name,
        id: {
          not: id,
        },
        userBoards: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (existingBoard) {
      throw new ConflictException('Já existe um board com esse nome');
    }

    return this.prismaService.boards.update({
      where: { id },
      data: { name },
    });
  }

  async remove(user: any, id: string) {
    const existingBoard = await this.prismaService.boards.findFirst({
      where: {
        id,
        userBoards: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (!existingBoard) {
      throw new NotFoundException('Board não encontrado');
    }

    await this.prismaService.boards.delete({
      where: { id },
    });
  }
}
