import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { BoardOwnershipGuard } from 'src/boards/guards/board-ownership.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ColumnOwnershipGuard } from 'src/columns/guards/column-ownership.guard';
import { ParamId } from 'src/decorators/param-id.decorator';

@UseGuards(JwtAuthGuard, BoardOwnershipGuard, ColumnOwnershipGuard)
@Controller('boards/:boardId/columns/:columnId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @ParamId('columnId') columnId: string,
    @ParamId('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(boardId, columnId, createTaskDto);
  }

  @Get()
  findAll(@ParamId('columnId') columnId: string) {
    return this.tasksService.findAll(columnId);
  }

  @Get(':taskId')
  findOne(
    @ParamId('columnId') columnId: string,
    @ParamId('taskId') taskId: string,
  ) {
    return this.tasksService.findOne(columnId, taskId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
