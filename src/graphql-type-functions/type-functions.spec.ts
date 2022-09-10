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
import {
  boolean,
  clientArray,
  doctor,
  doctorArray,
  float,
  group,
  groupArray,
  groupInvite,
  groupInviteArray,
  int,
  intArray,
  isoDateTime,
  job,
  jobArray,
  jobType,
  jobTypeArray,
  payment,
  paymentArray,
  paymentMethod,
  paymentMethodArray,
  tokens,
} from './type-functions';

describe('GraphQL type functions', () => {
  describe('float', () => {
    it('should return Float GraphQl type', () => {
      expect(float()).toEqual(Float);
    });
  });

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

  describe('group', () => {
    it('should return Group GraphQl type', () => {
      expect(group()).toEqual(Group);
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

  describe('payment', () => {
    it('should return Payment GraphQl type', () => {
      expect(payment()).toEqual(Payment);
    });
  });

  describe('paymentArray', () => {
    it('should return [Payment] GraphQl type', () => {
      expect(paymentArray()).toEqual([Payment]);
    });
  });

  describe('paymentMethod', () => {
    it('should return PaymentMethod GraphQl type', () => {
      expect(paymentMethod()).toEqual(PaymentMethod);
    });
  });

  describe('paymentMethodArray', () => {
    it('should return [PaymentMethod] GraphQl type', () => {
      expect(paymentMethodArray()).toEqual([PaymentMethod]);
    });
  });

  describe('job', () => {
    it('should return Job GraphQl type', () => {
      expect(job()).toEqual(Job);
    });
  });

  describe('jobArray', () => {
    it('should return [Job] GraphQl type', () => {
      expect(jobArray()).toEqual([Job]);
    });
  });

  describe('jobType', () => {
    it('should return JobType GraphQl type', () => {
      expect(jobType()).toEqual(JobType);
    });
  });

  describe('jobTypeArray', () => {
    it('should return [JobType] GraphQl type', () => {
      expect(jobTypeArray()).toEqual([JobType]);
    });
  });

  describe('groupInvite', () => {
    it('should return GroupInvite GraphQl type', () => {
      expect(groupInvite()).toEqual(GroupInvite);
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

  describe('tokens', () => {
    it('should return Tokens GraphQl type', () => {
      expect(tokens()).toEqual(Tokens);
    });
  });

  describe('boolean', () => {
    it('should return Boolean GraphQl type', () => {
      expect(boolean()).toEqual(Boolean);
    });
  });
});
