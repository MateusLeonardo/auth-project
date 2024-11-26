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

    try {
      return this.prismaService.boards.create({
        data: {
          name,
          userBoards: {
            create: {
              userId: user.id,
            },
          },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ConflictException('Erro ao criar board');
    }
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

  async findOne(id: string) {
    return this.prismaService.boards.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const existingBoard = await this.prismaService.boards.findFirst({
      where: {
        id,
      },
    });

    if (!existingBoard) {
      throw new NotFoundException('Board não existe');
    }

    return this.prismaService.boards.update({
      where: { id },
      data: updateBoardDto,
    });
  }

  async remove(id: string) {
    try {
      await this.prismaService.boards.delete({
        where: { id },
      });

      return { message: 'Board deletado com sucesso' };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ConflictException('Erro ao deletar board');
    }
  }
}
