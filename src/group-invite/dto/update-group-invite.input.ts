import { Field, InputType, Int } from '@nestjs/graphql';
import { InviteStatus, Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateGroupInviteInput
  implements Prisma.GroupInviteUncheckedUpdateInput
{
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsNotEmpty()
  @IsString()
  status?: InviteStatus;
}
