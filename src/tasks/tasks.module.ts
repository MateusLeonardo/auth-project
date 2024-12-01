import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthorizationModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
