import { CreatePaymentInput } from 'src/payment/dto/create-payment.input';
import { UpdatePaymentInput } from 'src/payment/dto/update-payment.input';
import { Payment } from 'src/payment/entities/payment.entity';
import { client1, client2 } from './clients';
import { doctor2 } from './doctor';
import { group1 } from './group';
import { job1, job2 } from './job';
import { paymentMethod1, paymentMethod2 } from './payment-method';

export const createPayment1Input: CreatePaymentInput = {
  paymentMethodId: 1,
  value: 100,
  clientId: 1,
  doctorId: null,
  groupId: 1,
  jobId: 1,
};

export const updatePayment2Input: UpdatePaymentInput = {
  id: 2,
  value: 200,
};

export const payment1: Payment = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  clientId: 1,
  doctorId: null,
  groupId: 1,
  jobId: 1,
  paymentMethodId: 1,
  value: 100,
  client: client1,
  doctor: null,
  group: group1,
  job: job1,
  method: paymentMethod1,
};

export const payment2: Payment = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  clientId: 1,
  doctorId: 2,
  groupId: null,
  jobId: 2,
  paymentMethodId: 2,
  value: 100,
  client: client2,
  doctor: doctor2,
  group: null,
  job: job2,
  method: paymentMethod2,
};

export const updatedPayment2: Payment = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  clientId: 1,
  doctorId: 2,
  groupId: null,
  jobId: 2,
  paymentMethodId: 2,
  value: 200,
  client: client2,
  doctor: doctor2,
  group: null,
  job: job2,
  method: paymentMethod2,
};
