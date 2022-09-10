import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { float, int } from '../../graphql-type-functions/type-functions';

@InputType()
export class UpdateJobTypeInput implements Prisma.JobTypeUncheckedUpdateInput {
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsString()
  name?: string;
  @Field(float)
  @IsOptional()
  @IsNumber()
  value?: number;
}
