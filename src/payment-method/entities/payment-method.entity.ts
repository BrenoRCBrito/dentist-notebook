import { Field, ObjectType } from '@nestjs/graphql';
import { Doctor } from '../../doctor/entities/doctor.entity';
import {
  doctor,
  float,
  group,
  int,
  isoDateTime,
  paymentArray,
} from '../../graphql-type-functions/type-functions';
import { Group } from '../../group/entities/group.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class PaymentMethod {
  @Field(int)
  id: number;
  @Field(isoDateTime)
  createdAt: Date;
  @Field(isoDateTime)
  updatedAt: Date;
  @Field()
  name: string;
  @Field(float)
  discountPercentage: number;
  @Field(float)
  feePercentage: number;
  @Field(group, { nullable: true })
  group: Group;
  @Field(int, { nullable: true })
  groupId: number;
  @Field(doctor, { nullable: true })
  doctor: Doctor;
  @Field(int, { nullable: true })
  doctorId: number;
  @Field(paymentArray)
  payments: Payment[];
}
