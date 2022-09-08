import { GraphQLISODateTime, Int } from '@nestjs/graphql';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Client } from '../client/entities/client.entity';
import { GroupInvite } from '../group-invite/entities/group-invite.entity';
import { Group } from '../group/entities/group.entity';
import { JobType } from '../job-type/entities/job-type.entity';
import { Job } from '../job/entities/job.entity';
import { PaymentMethod } from '../payment-method/entities/payment-method.entity';
import { Payment } from '../payment/entities/payment.entity';

export const int = () => Int;

export const intArray = () => [Int];

export const isoDateTime = () => GraphQLISODateTime;

export const groupArray = () => [Group];

export const clientArray = () => [Client];

export const paymentMethodArray = () => [PaymentMethod];

export const paymentArray = () => [Payment];

export const jobArray = () => [Job];

export const jobTypeArray = () => [JobType];

export const groupInviteArray = () => [GroupInvite];

export const doctor = () => Doctor;

export const doctorArray = () => [Doctor];
