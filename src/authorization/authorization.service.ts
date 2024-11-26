import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Para acessar o banco de dados

@Injectable()
export class AuthorizationService {
  constructor(private readonly prisma: PrismaService) {}

  async checkBoardOwnership(userId: string, boardId: string): Promise<void> {
    const board = await this.prisma.boards.findFirst({
      where: {
        id: boardId,
        userBoards: {
          some: { userId },
        },
      },
    });

    if (!board) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este board',
      );
    }
  }
}
