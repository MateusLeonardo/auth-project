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

  private async validateUserBoard(userId: string, boardId: string) {
    const board = await this.prismaService.boards.findFirst({
      where: {
        id: boardId,
        userBoards: {
          some: { userId },
        },
      },
    });

    if (!board) {
      throw new NotFoundException(
        'Você não tem acesso a este board ou ele não existe',
      );
    }

    return board;
  }

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

  async findOne(user: any, id: string) {
    return this.validateUserBoard(user.id, id);
  }

  async update(user: any, id: string, { name }: UpdateBoardDto) {
    await this.validateUserBoard(user.id, id);

    const existingBoard = await this.prismaService.boards.findFirst({
      where: {
        name,
        id: { not: id },
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
    await this.validateUserBoard(user.id, id);

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
