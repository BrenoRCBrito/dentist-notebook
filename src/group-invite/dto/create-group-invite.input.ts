import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGroupInviteInput
  implements Prisma.GroupInviteCreateManyInput
{
  @Field()
  @IsNotEmpty()
  @IsString()
  message: string;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  doctorId?: number;
}
