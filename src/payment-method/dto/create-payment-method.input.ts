import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreatePaymentMethodInput
  implements Prisma.PaymentMethodCreateManyInput
{
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  discountPercentage?: number;
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  feePercentage?: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  doctorId?: number;
}
