import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BoardsModule,
    ColumnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
