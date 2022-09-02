import {
  ObjectType,
  Field,
  Int,
  GraphQLISODateTime,
  Float,
} from '@nestjs/graphql';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';
import { Job } from '../../job/entities/job.entity';

@ObjectType()
export class JobType {
  @Field(() => Int)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field()
  name: string;
  @Field(() => Float)
  value: number;
  @Field(() => Group, { nullable: true })
  group: Group;
  @Field(() => Int, { nullable: true })
  groupId: number;
  @Field(() => Doctor, { nullable: true })
  doctor: Doctor;
  @Field(() => Int, { nullable: true })
  doctorId: number;
  @Field(() => [Job], { nullable: 'items' })
  jobs: Job[];
}
