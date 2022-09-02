import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UpdatePaymentInput implements Prisma.PaymentUncheckedUpdateInput {
  @Field(() => Int)
  id: number;
  @Field(() => Float)
  value?: number;
  @Field(() => Int)
  paymentMethodId?: number;
  @Field(() => Int)
  groupId?: number | null;
  @Field(() => Int)
  doctorId?: number | null;
  @Field(() => Int)
  clientId?: number;
  @Field(() => Int)
  jobId?: number;
}
