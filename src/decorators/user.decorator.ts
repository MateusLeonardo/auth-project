import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException('Usuário não encontrado no Request.');
    }
    if (!filter) {
      return request.user;
    }
    return request.user[filter];
  },
);
