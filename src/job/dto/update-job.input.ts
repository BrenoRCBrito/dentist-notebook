import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { float, int } from '../../graphql-type-functions/type-functions';

@InputType()
export class UpdateJobInput implements Prisma.JobUncheckedUpdateInput {
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsString()
  notes?: string;
  @Field(float)
  @IsOptional()
  @IsNumber()
  installmentsNumber?: number;
  @Field(float)
  @IsOptional()
  @IsNumber()
  installmentValue?: number;
  @Field(float)
  @IsOptional()
  @IsNumber()
  paidInstallments?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  jobTypeId?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  doctorId?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  clientId?: number;
}
