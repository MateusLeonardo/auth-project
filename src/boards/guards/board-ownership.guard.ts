import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthorizationService } from 'src/authorization/authorization.service';

@Injectable()
export class BoardOwnershipGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const boardId = request.params.id;

    await this.authorizationService.checkBoardOwnership(userId, boardId);

    return true;
  }
}
