import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { float, int } from '../../graphql-type-functions/type-functions';

@InputType()
export class CreatePaymentInput implements Prisma.PaymentCreateManyInput {
  @Field(float)
  @IsNotEmpty()
  @IsNumber()
  value: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  paymentMethodId: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  groupId?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  doctorId?: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  clientId?: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  jobId?: number;
}
