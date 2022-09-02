import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UpdateGroupInput implements Prisma.GroupUncheckedUpdateManyInput {
  @Field(() => Int)
  id?: number;
  @Field()
  name?: string;
  @Field(() => Int)
  adminId?: number;
}
