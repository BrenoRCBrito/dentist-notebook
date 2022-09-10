import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { float, int } from '../../graphql-type-functions/type-functions';

@InputType()
export class CreateJobInput implements Prisma.JobCreateManyInput {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  notes: string;
  @Field(float)
  @IsNotEmpty()
  @IsNumber()
  installmentsNumber?: number;
  @Field(float)
  @IsNotEmpty()
  @IsNumber()
  installmentValue: number;
  @Field(float)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  paidInstallments?: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  jobTypeId: number;
  @Field(int)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;
  @Field(int)
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  doctorId?: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  clientId?: number;
}
