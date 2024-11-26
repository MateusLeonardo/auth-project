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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardOwnershipGuard } from 'src/boards/guards/board-ownership.guard';

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
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(+id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(+id);
  }
}
