import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';
import { Job } from '../../job/entities/job.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class Client {
  @Field(() => Int)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field()
  name: string;
  @Field()
  lastName: string;
  @Field(() => [Group], { nullable: 'itemsAndList' })
  groups: Group[];
  @Field(() => [Doctor], { nullable: 'itemsAndList' })
  doctors: Doctor[];
  @Field(() => [Job], { nullable: 'items' })
  jobs: Job[];
  @Field(() => [Payment], { nullable: 'items' })
  payments: Payment[];
}
