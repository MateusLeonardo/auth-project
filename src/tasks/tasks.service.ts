import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}
  async create(
    boardId: string,
    columnId: string,
    createTaskDto: CreateTaskDto,
  ) {
    const board = await this.prismaService.boards.findUnique({
      where: {
        id: boardId,
      },
    });

    const column = await this.prismaService.columns.findUnique({
      where: {
        id: columnId,
      },
    });

    if (!board || !column) {
      throw new NotFoundException('Board ou coluna não encontrada.');
    }

    const existsTask = await this.prismaService.tasks.findFirst({
      where: {
        title: createTaskDto.title,
        columnId,
      },
    });

    if (existsTask) {
      throw new ConflictException(
        'Já existe uma tarefa com este nome na coluna.',
      );
    }

    return this.prismaService.tasks.create({
      data: {
        ...createTaskDto,
        column: { connect: { id: columnId } },
      },
    });
  }

  async findAll(columnId: string) {
    const tasks = await this.prismaService.tasks.findMany({
      where: {
        columnId,
      },
    });

    if (!tasks) {
      throw new NotFoundException('Tarefas não encontradas.');
    }

    return tasks;
  }

  async findOne(columnId: string, taskId: string) {
    const task = await this.prismaService.tasks.findUnique({
      where: {
        id: taskId,
        columnId,
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada.');
    }

    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
