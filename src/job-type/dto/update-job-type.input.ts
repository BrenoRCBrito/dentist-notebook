import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UpdateJobTypeInput implements Prisma.JobTypeUncheckedUpdateInput {
  @Field(() => Int)
  id: number;
  @Field()
  name?: string;
  @Field(() => Float)
  value?: number;
}
