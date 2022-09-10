import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { float, int } from '../../graphql-type-functions/type-functions';

@InputType()
export class UpdatePaymentMethodInput
  implements Prisma.PaymentMethodUncheckedUpdateInput
{
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutMethodInput;
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsString()
  name?: string;
  @Field(float)
  @IsOptional()
  @IsNumber()
  discountPercentage?: number;
  @Field(float)
  @IsOptional()
  @IsNumber()
  feePercentage?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  groupId?: number;
  @Field(int)
  @IsOptional()
  @IsNumber()
  doctorId?: number;
}
