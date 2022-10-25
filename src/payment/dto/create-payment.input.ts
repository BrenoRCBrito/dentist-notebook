import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreatePaymentInput implements Prisma.PaymentCreateManyInput {
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  value: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  paymentMethodId: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  groupId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  doctorId?: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  clientId?: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  jobId?: number;
}
