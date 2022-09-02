import { InputType, Int, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateGroupInput implements Prisma.GroupCreateManyInput {
  @Field(() => Int)
  id?: number;
  @Field()
  name: string;
  @Field(() => Int)
  adminId: number;
}
