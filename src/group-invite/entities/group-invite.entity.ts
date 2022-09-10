import { Field, ObjectType } from '@nestjs/graphql';
import { InviteStatus } from '@prisma/client';
import {
  doctor,
  group,
  int,
  isoDateTime,
} from '../../graphql-type-functions/type-functions';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';

@ObjectType()
export class GroupInvite {
  @Field(int)
  id: number;
  @Field(isoDateTime)
  createdAt: Date;
  @Field(isoDateTime)
  updatedAt: Date;
  @Field()
  message: string;
  @Field()
  status: InviteStatus;
  @Field(group)
  group: Group;
  @Field(int)
  groupId: number;
  @Field(doctor)
  doctor: Doctor;
  @Field(int)
  doctorId: number;
}
