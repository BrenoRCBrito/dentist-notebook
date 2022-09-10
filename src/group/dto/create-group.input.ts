import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';
import { int } from '../../graphql-type-functions/type-functions';

@InputType()
export class CreateGroupInput implements Prisma.GroupCreateManyInput {
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  adminId: number;
}
