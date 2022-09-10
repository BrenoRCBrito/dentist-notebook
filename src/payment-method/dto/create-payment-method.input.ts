import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { float, int } from '../../graphql-type-functions/type-functions';

@InputType()
export class CreatePaymentMethodInput
  implements Prisma.PaymentMethodCreateManyInput
{
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
  @Field(float)
  @IsNotEmpty()
  @IsNumber()
  discountPercentage?: number;
  @Field(float)
  @IsNotEmpty()
  @IsNumber()
  feePercentage?: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  doctorId?: number;
}
