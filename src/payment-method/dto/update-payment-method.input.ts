import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UpdatePaymentMethodInput
  implements Prisma.PaymentMethodUncheckedCreateInput
{
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field(() => Float)
  discountPercentage?: number;
  @Field(() => Float)
  feePercentage?: number;
  @Field(() => Int)
  groupId?: number;
  @Field(() => Int)
  doctorId?: number;
}
