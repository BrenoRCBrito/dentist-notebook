import { GraphQLISODateTime, Int } from '@nestjs/graphql';
import { Doctor } from '../doctor/entities/doctor.entity';
import { Client } from '../client/entities/client.entity';
import { GroupInvite } from '../group-invite/entities/group-invite.entity';
import { Group } from '../group/entities/group.entity';
import { JobType } from '../job-type/entities/job-type.entity';
import { Job } from '../job/entities/job.entity';
import { PaymentMethod } from '../payment-method/entities/payment-method.entity';
import { Payment } from '../payment/entities/payment.entity';
import {
  clientArray,
  doctor,
  doctorArray,
  groupArray,
  groupInviteArray,
  int,
  intArray,
  isoDateTime,
  jobArray,
  jobTypeArray,
  paymentArray,
  paymentMethodArray,
} from './type-functions';

describe('GraphQL type functions', () => {
  describe('int', () => {
    it('should return Int GraphQl type', () => {
      expect(int()).toEqual(Int);
    });
  });

  describe('isoDateTime', () => {
    it('should return IsoDateTime GraphQl type', () => {
      expect(isoDateTime()).toEqual(GraphQLISODateTime);
    });
  });

  describe('intArray', () => {
    it('should return intArray GraphQl type', () => {
      expect(intArray()).toEqual([Int]);
    });
  });

  describe('groupArray', () => {
    it('should return [Group] GraphQl type', () => {
      expect(groupArray()).toEqual([Group]);
    });
  });

  describe('clientArray', () => {
    it('should return [Client] GraphQl type', () => {
      expect(clientArray()).toEqual([Client]);
    });
  });

  describe('paymentArray', () => {
    it('should return [Payment] GraphQl type', () => {
      expect(paymentArray()).toEqual([Payment]);
    });
  });

  describe('paymentMethodArray', () => {
    it('should return [PaymentMethod] GraphQl type', () => {
      expect(paymentMethodArray()).toEqual([PaymentMethod]);
    });
  });

  describe('jobArray', () => {
    it('should return [Job] GraphQl type', () => {
      expect(jobArray()).toEqual([Job]);
    });
  });

  describe('jobTypeArray', () => {
    it('should return [JobType] GraphQl type', () => {
      expect(jobTypeArray()).toEqual([JobType]);
    });
  });

  describe('groupInviteArray', () => {
    it('should return [GroupInvite] GraphQl type', () => {
      expect(groupInviteArray()).toEqual([GroupInvite]);
    });
  });

  describe('doctor', () => {
    it('should return Doctor GraphQl type', () => {
      expect(doctor()).toEqual(Doctor);
    });
  });

  describe('doctorArray', () => {
    it('should return [Doctor] GraphQl type', () => {
      expect(doctorArray()).toEqual([Doctor]);
    });
  });
});
