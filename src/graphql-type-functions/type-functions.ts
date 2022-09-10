import { Float, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { Tokens } from '../auth/entities/tokens.entity';
import { Client } from '../client/entities/client.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { GroupInvite } from '../group-invite/entities/group-invite.entity';
import { Group } from '../group/entities/group.entity';
import { JobType } from '../job-type/entities/job-type.entity';
import { Job } from '../job/entities/job.entity';
import { PaymentMethod } from '../payment-method/entities/payment-method.entity';
import { Payment } from '../payment/entities/payment.entity';

export const float = () => Float;

export const int = () => Int;

export const intArray = () => [Int];

export const isoDateTime = () => GraphQLISODateTime;

export const group = () => Group;

export const groupArray = () => [Group];

export const client = () => Client;

export const clientArray = () => [Client];

export const paymentMethod = () => PaymentMethod;

export const paymentMethodArray = () => [PaymentMethod];

export const payment = () => Payment;

export const paymentArray = () => [Payment];

export const job = () => Job;

export const jobArray = () => [Job];

export const jobType = () => JobType;

export const jobTypeArray = () => [JobType];

export const groupInvite = () => GroupInvite;

export const groupInviteArray = () => [GroupInvite];

export const doctor = () => Doctor;

export const doctorArray = () => [Doctor];

export const tokens = () => Tokens;

export const boolean = () => Boolean;
