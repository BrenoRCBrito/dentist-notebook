import { Field, InputType } from '@nestjs/graphql';
import { InviteStatus, Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { int } from '../../graphql-type-functions/type-functions';

@InputType()
export class UpdateGroupInviteInput
  implements Prisma.GroupInviteUncheckedUpdateInput
{
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsNotEmpty()
  @IsString()
  status?: InviteStatus;
}
