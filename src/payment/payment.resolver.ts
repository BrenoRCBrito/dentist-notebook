import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { ClientService } from '../client/client.service';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { JobService } from '../job/job.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly groupService: GroupService,
    private readonly doctorService: DoctorService,
    private readonly clientService: ClientService,
    private readonly jobService: JobService,
  ) {}

  @Mutation(() => Payment)
  createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return this.paymentService.create({ data: createPaymentInput });
  }

  @Query(() => [Payment], { name: 'payments' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Query(() => Payment, { name: 'payment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.findOne({ where: { id } });
  }

  @Mutation(() => Payment)
  updatePayment(
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
  ) {
    return this.paymentService.update({
      where: { id: updatePaymentInput.id },
      data: updatePaymentInput,
    });
  }

  @Mutation(() => Payment)
  removePayment(@Args('id', { type: () => Int }) id: number) {
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
    if (!payment.groupId) return null;
    return this.groupService.findOne({ where: { id: payment.groupId } });
  }

  @ResolveField()
  doctor(@Parent() payment: Payment) {
    if (!payment.doctorId) return null;
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
