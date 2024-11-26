import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { ParamId } from 'src/decorators/param-id.decorator';
import { BoardOwnershipGuard } from './guards/board-ownership.guard';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@User() user, @Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(user, createBoardDto);
  }

  @Get()
  findAll(@User() user) {
    return this.boardsService.findAll(user);
  }

  @Get(':boardId')
  @UseGuards(BoardOwnershipGuard)
  findOne(@ParamId('boardId') boardId: string) {
    return this.boardsService.findOne(boardId);
  }

  @Patch(':boardId')
  @UseGuards(BoardOwnershipGuard)
  update(
    @ParamId('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  @UseGuards(BoardOwnershipGuard)
  remove(@ParamId('boardId') boardId: string) {
    return this.boardsService.remove(boardId);
  }
}
