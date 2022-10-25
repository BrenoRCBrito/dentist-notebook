import { CreatePaymentMethodInput } from 'src/payment-method/dto/create-payment-method.input';
import { UpdatePaymentMethodInput } from 'src/payment-method/dto/update-payment-method.input';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import { doctor2 } from './doctor';
import { group1 } from './group';
import { payment1, payment2 } from './payment';

export const createPaymentMethod1Input: CreatePaymentMethodInput = {
  name: 'CREDIT CARD',
  discountPercentage: 0,
  doctorId: null,
  feePercentage: 5,
  groupId: 1,
};

export const updatePaymentMethod2Input: UpdatePaymentMethodInput = {
  id: 2,
  discountPercentage: 2,
};

export const paymentMethod1: PaymentMethod = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'CREDIT CARD',
  discountPercentage: 0,
  doctor: null,
  doctorId: null,
  feePercentage: 5,
  group: group1,
  groupId: 1,
  payments: [payment1],
};

export const paymentMethod2: PaymentMethod = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'DEBIT CARD',
  discountPercentage: 0,
  doctor: doctor2,
  doctorId: 2,
  feePercentage: null,
  group: null,
  groupId: null,
  payments: [payment2],
};

export const updatedPaymentMethod2: PaymentMethod = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'DEBIT CARD',
  discountPercentage: 2,
  doctor: doctor2,
  doctorId: 2,
  feePercentage: null,
  group: null,
  groupId: null,
  payments: [payment2],
};
