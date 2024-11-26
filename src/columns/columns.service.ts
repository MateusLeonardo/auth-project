import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColumnsService {
  constructor(private prismaService: PrismaService) {}

  async create(boardId: string, createColumnDto: CreateColumnDto) {
    const existingColumn = await this.prismaService.columns.findFirst({
      where: {
        name: createColumnDto.name,
        boardId,
      },
    });

    if (existingColumn) {
      throw new ConflictException('Já existe uma coluna com esse nome');
    }

    try {
      return this.prismaService.columns.create({
        data: {
          ...createColumnDto,
          board: { connect: { id: boardId } },
        },
      });
    } catch (error: any) {
      throw new ConflictException(`Erro ao cadastrar coluna: ${error.message}`);
    }
  }

  async findAll(user: any, boardId: string) {
    const userBoards = await this.prismaService.userBoards.findMany({
      where: {
        userId: user.id,
        boardId,
      },
    });
    if (userBoards.length === 0) {
      throw new NotFoundException('Board não encontrado');
    }

    return this.prismaService.columns.findMany({
      where: { boardId },
    });
  }

  async findOne(columnId: string) {
    const column = await this.prismaService.columns.findUnique({
      where: { id: columnId },
    });

    if (!column) {
      throw new NotFoundException('Coluna não encontrada');
    }

    return column;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(columnId: string, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${columnId} column`;
  }

  remove(columnId: string) {
    return `This action removes a #${columnId} column`;
  }
}
