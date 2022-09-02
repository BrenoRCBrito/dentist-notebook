import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { PaymentService } from '../payment/payment.service';
import { CreatePaymentMethodInput } from './dto/create-payment-method.input';
import { UpdatePaymentMethodInput } from './dto/update-payment-method.input';
import { PaymentMethod } from './entities/payment-method.entity';
import { PaymentMethodService } from './payment-method.service';

@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private readonly groupService: GroupService,
    private readonly doctorService: DoctorService,
    private readonly paymentService: PaymentService,
  ) {}

  @Mutation(() => PaymentMethod)
  createPaymentMethod(
    @Args('createPaymentMethodInput')
    createPaymentMethodInput: CreatePaymentMethodInput,
  ) {
    return this.paymentMethodService.create(createPaymentMethodInput);
  }

  @Query(() => [PaymentMethod], { name: 'paymentMethods' })
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Query(() => PaymentMethod, { name: 'paymentMethod' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentMethodService.findOne(id);
  }

  @Mutation(() => PaymentMethod)
  updatePaymentMethod(
    @Args('updatePaymentMethodInput')
    updatePaymentMethodInput: UpdatePaymentMethodInput,
  ) {
    return this.paymentMethodService.update(
      updatePaymentMethodInput.id,
      updatePaymentMethodInput,
    );
  }

  @Mutation(() => PaymentMethod)
  removePaymentMethod(@Args('id', { type: () => Int }) id: number) {
    return this.paymentMethodService.remove(id);
  }

  @ResolveField()
  group(@Parent() paymentMethod: PaymentMethod) {
    if (!paymentMethod.groupId) return null;
    return this.groupService.findOne(paymentMethod.groupId);
  }

  @ResolveField()
  doctor(@Parent() paymentMethod: PaymentMethod) {
    if (!paymentMethod.doctorId) return null;
    return this.doctorService.findOne(paymentMethod.doctorId);
  }

  @ResolveField()
  payments(@Parent() paymentMethod: PaymentMethod) {
    return this.paymentService.findAllByMethod(paymentMethod.id);
  }
}
