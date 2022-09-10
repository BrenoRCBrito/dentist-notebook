import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { int } from '../../graphql-type-functions/type-functions';

@InputType()
export class CreateGroupInviteInput
  implements Prisma.GroupInviteCreateManyInput
{
  @Field()
  @IsNotEmpty()
  @IsString()
  message: string;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  doctorId?: number;
}
