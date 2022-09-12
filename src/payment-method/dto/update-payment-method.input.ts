import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdatePaymentMethodInput
  implements Prisma.PaymentMethodUncheckedUpdateInput
{
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutMethodInput;
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsString()
  name?: string;
  @Field(() => Float)
  @IsOptional()
  @IsNumber()
  discountPercentage?: number;
  @Field(() => Float)
  @IsOptional()
  @IsNumber()
  feePercentage?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  groupId?: number;
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  doctorId?: number;
}
