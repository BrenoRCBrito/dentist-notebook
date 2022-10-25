import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Group } from '../../group/entities/group.entity';
import { Payment } from '../../payment/entities/payment.entity';

@ObjectType()
export class PaymentMethod {
  @Field(() => Int)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field()
  name: string;
  @Field(() => Float)
  discountPercentage: number;
  @Field(() => Float)
  feePercentage: number;
  @Field(() => Group, { nullable: true })
  group: Group;
  @Field(() => Int, { nullable: true })
  groupId: number;
  @Field(() => Doctor, { nullable: true })
  doctor: Doctor;
  @Field(() => Int, { nullable: true })
  doctorId: number;
  @Field(() => [Payment])
  payments: Payment[];
}
