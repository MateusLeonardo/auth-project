import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardOwnershipGuard } from 'src/boards/guards/board-ownership.guard';
import { ParamId } from 'src/decorators/param-id.decorator';
import { User } from 'src/decorators/user.decorator';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnOwnershipGuard } from './guards/column-ownership.guard';

@UseGuards(JwtAuthGuard, BoardOwnershipGuard)
@Controller('boards/:boardId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(
    @ParamId('boardId') boardId: string,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return this.columnsService.create(boardId, createColumnDto);
  }

  @Get()
  findAll(@User() user, @ParamId('boardId') boardId: string) {
    return this.columnsService.findAll(user, boardId);
  }

  @Get(':columnId')
  @UseGuards(ColumnOwnershipGuard)
  findOne(@ParamId('columnId') columnId: string) {
    return this.columnsService.findOne(columnId);
  }

  @Patch(':columnId')
  @UseGuards(ColumnOwnershipGuard)
  update(
    @ParamId('columnId') columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(columnId, updateColumnDto);
  }

  @Delete(':columnId')
  @UseGuards(ColumnOwnershipGuard)
  remove(@ParamId('columnId') columnId: string) {
    return this.columnsService.remove(columnId);
  }
}
