import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UpdateJobInput implements Prisma.JobUncheckedUpdateInput {
  @Field(() => Int)
  id: number;
  @Field()
  notes?: string;
  @Field(() => Float)
  installmentsNumber?: number;
  @Field(() => Float)
  installmentValue?: number;
  @Field(() => Float)
  paidInstallments?: number;
  @Field(() => Int)
  jobTypeId?: number;
  @Field(() => Int)
  doctorId?: number;
  @Field(() => Int)
  clientId?: number;
}
