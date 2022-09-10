import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { float, int } from '../../graphql-type-functions/type-functions';

@InputType()
export class UpdatePaymentInput implements Prisma.PaymentUncheckedUpdateInput {
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field(float)
  @IsOptional()
  @IsNumber()
  value?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  paymentMethodId?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  groupId?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  doctorId?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  clientId?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  jobId?: number;
}
