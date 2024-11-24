import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.params[data];
    }

    return request.params['id'];
  },
);
