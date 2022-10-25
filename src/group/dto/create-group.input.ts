import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateGroupInput implements Prisma.GroupCreateManyInput {
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  adminId: number;
}
