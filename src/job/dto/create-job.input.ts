import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateJobInput implements Prisma.JobCreateManyInput {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  notes: string;
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  installmentsNumber?: number;
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  installmentValue: number;
  @Field(() => Float)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  paidInstallments?: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  jobTypeId: number;
  @Field(() => Int)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  doctorId?: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  clientId?: number;
}
