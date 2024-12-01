import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthorizationService } from 'src/authorization/authorization.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColumnOwnershipGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { boardId, columnId: columnId } = request.params;

    await this.authorizationService.checkColumnOwnership(columnId, boardId);

    return true;
  }
}
