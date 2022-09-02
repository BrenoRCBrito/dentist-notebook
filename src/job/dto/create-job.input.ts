import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateJobInput implements Prisma.JobCreateManyInput {
  @Field()
  notes: string;
  @Field(() => Float)
  installmentsNumber?: number;
  @Field(() => Float)
  installmentValue: number;
  @Field(() => Float)
  paidInstallments?: number;
  @Field(() => Int)
  jobTypeId: number;
  @Field(() => Int)
  groupId?: number;
  @Field(() => Int)
  doctorId?: number;
  @Field(() => Int)
  clientId?: number;
}
