import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateGroupInput implements Prisma.GroupUncheckedUpdateManyInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsAlpha()
  name?: string;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  adminId?: number;
}
