import { Field, ObjectType } from '@nestjs/graphql';
import {
  doctor,
  float,
  group,
  int,
  isoDateTime,
  jobArray,
} from '../../graphql-type-functions/type-functions';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';
import { Job } from '../../job/entities/job.entity';

@ObjectType()
export class JobType {
  @Field(int)
  id: number;
  @Field(isoDateTime)
  createdAt: Date;
  @Field(isoDateTime)
  updatedAt: Date;
  @Field()
  name: string;
  @Field(float)
  value: number;
  @Field(group, { nullable: true })
  group: Group;
  @Field(int, { nullable: true })
  groupId: number;
  @Field(doctor, { nullable: true })
  doctor: Doctor;
  @Field(int, { nullable: true })
  doctorId: number;
  @Field(jobArray, { nullable: 'items' })
  jobs: Job[];
}
