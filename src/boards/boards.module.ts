import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [PrismaModule, AuthorizationModule],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {}
