import { ConflictException, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all columns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
