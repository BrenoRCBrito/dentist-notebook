import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import {
  int,
  payment,
  paymentArray,
} from '../graphql-type-functions/type-functions';
import { GroupService } from '../group/group.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver(payment)
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly groupService: GroupService,
    private readonly doctorService: DoctorService,
    private readonly clientService: ClientService,
    private readonly jobService: JobService,
  ) {}

  @Mutation(payment)
  createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return this.paymentService.create({ data: createPaymentInput });
  }

  @Query(paymentArray, { name: 'payments' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Query(payment, { name: 'payment' })
  findOne(@Args('id', { type: int }) id: number) {
    return this.paymentService.findOne({ where: { id } });
  }

  @Mutation(payment)
  updatePayment(
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
  ) {
    return this.paymentService.update({
      where: { id: updatePaymentInput.id },
      data: updatePaymentInput,
    });
  }

  @Mutation(payment)
  removePayment(@Args('id', { type: int }) id: number) {
    return this.paymentService.remove({ where: { id } });
  }

  @ResolveField()
  method(@Parent() payment: Payment) {
    return this.paymentMethodService.findOne({
      where: { id: payment.paymentMethodId },
    });
  }

  @ResolveField()
  group(@Parent() payment: Payment) {
    return this.groupService.findOne({ where: { id: payment.groupId } });
  }

  @ResolveField()
  doctor(@Parent() payment: Payment) {
    return this.doctorService.findOne({ where: { id: payment.doctorId } });
  }

  @ResolveField()
  client(@Parent() payment: Payment) {
    return this.clientService.findOne({ where: { id: payment.clientId } });
  }

  @ResolveField()
  job(@Parent() payment: Payment) {
    return this.jobService.findOne({ where: { id: payment.jobId } });
  }
}
