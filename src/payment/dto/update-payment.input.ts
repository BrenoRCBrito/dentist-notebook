import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdatePaymentInput implements Prisma.PaymentUncheckedUpdateInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field(() => Float)
  @IsOptional()
  @IsNumber()
  value?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  paymentMethodId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  groupId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  doctorId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  clientId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  jobId?: number;
}
