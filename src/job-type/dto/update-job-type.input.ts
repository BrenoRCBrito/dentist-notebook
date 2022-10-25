import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateJobTypeInput implements Prisma.JobTypeUncheckedUpdateInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsString()
  name?: string;
  @Field(() => Float)
  @IsOptional()
  @IsNumber()
  value?: number;
}
