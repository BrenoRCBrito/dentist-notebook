import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserAndToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return {
      authorization: (ctx.getContext().req.headers.authorization as string)
        .replace('Bearer', '')
        .trim(),
      user: ctx.getContext().req.user,
    };
  },
);
