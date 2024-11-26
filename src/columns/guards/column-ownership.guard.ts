import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class ColumnOwnershipGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { boardId, columnId: columnId } = request.params;

    const column = await this.prismaService.columns.findFirst({
      where: {
        id: columnId,
        boardId: boardId,
      },
    });

    if (!column) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta coluna',
      );
    }

    return true;
  }
}
