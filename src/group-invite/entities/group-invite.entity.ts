import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { InviteStatus } from '@prisma/client';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';

@ObjectType()
export class GroupInvite {
  @Field(() => Int)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field()
  message: string;
  @Field()
  status: InviteStatus;
  @Field(() => Group)
  group: Group;
  @Field(() => Int)
  groupId: number;
  @Field(() => Doctor)
  doctor: Doctor;
  @Field(() => Int)
  doctorId: number;
}
