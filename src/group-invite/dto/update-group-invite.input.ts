import { InputType, Field, Int } from '@nestjs/graphql';
import { InviteStatus, Prisma } from '@prisma/client';

@InputType()
export class UpdateGroupInviteInput
  implements Prisma.GroupInviteUncheckedUpdateInput
{
  @Field(() => Int)
  id?: number;
  @Field()
  status?: InviteStatus;
}
