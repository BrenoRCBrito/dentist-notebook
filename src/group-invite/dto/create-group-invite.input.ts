import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateGroupInviteInput
  implements Prisma.GroupInviteCreateManyInput
{
  @Field()
  message: string;
  @Field(() => Int)
  groupId?: number;
  @Field(() => Int)
  doctorId?: number;
}
