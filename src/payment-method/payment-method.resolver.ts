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
    return this.paymentMethodService.create({ data: createPaymentMethodInput });
  }

  @Query(() => [PaymentMethod], { name: 'paymentMethods' })
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Query(() => PaymentMethod, { name: 'paymentMethod' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentMethodService.findOne({ where: { id } });
  }

  @Mutation(() => PaymentMethod)
  updatePaymentMethod(
    @Args('updatePaymentMethodInput')
    updatePaymentMethodInput: UpdatePaymentMethodInput,
  ) {
    return this.paymentMethodService.update({
      where: { id: updatePaymentMethodInput.id },
      data: updatePaymentMethodInput,
    });
  }

  @Mutation(() => PaymentMethod)
  removePaymentMethod(@Args('id', { type: () => Int }) id: number) {
    return this.paymentMethodService.remove({ where: { id } });
  }

  @ResolveField()
  group(@Parent() paymentMethod: PaymentMethod) {
    return this.groupService.findOne({ where: { id: paymentMethod.groupId } });
  }

  @ResolveField()
  doctor(@Parent() paymentMethod: PaymentMethod) {
    return this.doctorService.findOne({
      where: { id: paymentMethod.doctorId },
    });
  }

  @ResolveField()
  payments(@Parent() paymentMethod: PaymentMethod) {
    return this.paymentService.findAll({
      where: { paymentMethodId: paymentMethod.id },
    });
  }
}
