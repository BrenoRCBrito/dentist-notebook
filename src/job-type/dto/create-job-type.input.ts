import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateJobTypeInput implements Prisma.JobTypeCreateManyInput {
  @Field()
  name: string;
  @Field(() => Float)
  value: number;
  @Field(() => Int)
  groupId?: number;
  @Field(() => Int)
  doctorId?: number;
}
