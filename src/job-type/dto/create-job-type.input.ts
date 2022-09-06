import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateJobTypeInput implements Prisma.JobTypeCreateManyInput {
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  value: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  doctorId?: number;
}
