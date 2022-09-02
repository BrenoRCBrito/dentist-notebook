import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreatePaymentInput implements Prisma.PaymentCreateManyInput {
  @Field(() => Float)
  value: number;
  @Field(() => Int)
  paymentMethodId: number;
  @Field(() => Int)
  groupId?: number;
  @Field(() => Int)
  doctorId?: number;
  @Field(() => Int)
  clientId?: number;
  @Field(() => Int)
  jobId?: number;
}
