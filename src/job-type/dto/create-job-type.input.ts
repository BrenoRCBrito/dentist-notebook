import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsAlpha, IsNotEmpty, IsNumber } from 'class-validator';
import { float, int } from '../../graphql-type-functions/type-functions';

@InputType()
export class CreateJobTypeInput implements Prisma.JobTypeCreateManyInput {
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;
  @Field(float)
  @IsNotEmpty()
  @IsNumber()
  value: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  doctorId?: number;
}
