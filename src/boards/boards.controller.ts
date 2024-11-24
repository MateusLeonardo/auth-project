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

  @Get(':id')
  findOne(@User() user, @ParamId() id: string) {
    return this.boardsService.findOne(user, id);
  }

  @Patch(':id')
  update(
    @User() user,
    @ParamId() id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(user, id, updateBoardDto);
  }

  @Delete(':id')
  remove(@User() user, @ParamId() id: string) {
    return this.boardsService.remove(user, id);
  }
}
