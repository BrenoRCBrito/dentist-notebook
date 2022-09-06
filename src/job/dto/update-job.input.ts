import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateJobInput implements Prisma.JobUncheckedUpdateInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsString()
  notes?: string;
  @Field(() => Float)
  @IsOptional()
  @IsNumber()
  installmentsNumber?: number;
  @Field(() => Float)
  @IsOptional()
  @IsNumber()
  installmentValue?: number;
  @Field(() => Float)
  @IsOptional()
  @IsNumber()
  paidInstallments?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  jobTypeId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  doctorId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  clientId?: number;
}
