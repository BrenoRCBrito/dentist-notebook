import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClientService } from '../client/client.service';
import {
  doctor,
  doctorArray,
  int,
} from '../graphql-type-functions/type-functions';
import { GroupInviteService } from '../group-invite/group-invite.service';
import { GroupService } from '../group/group.service';
import { JobTypeService } from '../job-type/job-type.service';
import { JobService } from '../job/job.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { PaymentService } from '../payment/payment.service';
import mapManyToManyUpdateInput from '../utils/mapManyToManyUpdateInput';
import { DoctorService } from './doctor.service';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { Doctor } from './entities/doctor.entity';

@Resolver(doctor)
export class DoctorResolver {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly clientService: ClientService,
    private readonly groupService: GroupService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly paymentService: PaymentService,
    private readonly jobService: JobService,
    private readonly jobTypeService: JobTypeService,
    private readonly groupInviteService: GroupInviteService,
  ) {}

  @Mutation(doctor)
  createDoctor(
    @Args('createDoctorInput') createDoctorInput: CreateDoctorInput,
  ) {
    return this.doctorService.create({ data: createDoctorInput });
  }

  @Query(doctorArray, { name: 'doctors' })
  findAll() {
    return this.doctorService.findAll();
  }

  @Query(doctor, { name: 'doctor' })
  findOne(@Args('id', { type: int }) id: number) {
    return this.doctorService.findOne({ where: { id } });
  }

  @Mutation(doctor)
  updateDoctor(
    @Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput,
  ) {
    let checkedInput;
    if (
      Array.isArray(updateDoctorInput.groups) &&
      updateDoctorInput.groups.length > 0
    ) {
      checkedInput = mapManyToManyUpdateInput(updateDoctorInput);
    } else checkedInput = updateDoctorInput;
    return this.doctorService.update({
      where: { id: updateDoctorInput.id },
      data: checkedInput,
    });
  }

  @Mutation(doctor)
  removeDoctor(@Args('id', { type: int }) id: number) {
    return this.doctorService.remove({ where: { id } });
  }

  @ResolveField()
  clients(@Parent() doctor: Doctor) {
    return this.clientService.findAll({
      where: {
        doctors: {
          some: {
            id: doctor.id,
          },
        },
      },
    });
  }

  @ResolveField()
  managedGroups(@Parent() doctor: Doctor) {
    return this.groupService.findAll({
      where: { adminId: doctor.id },
    });
  }

  @ResolveField()
  groups(@Parent() doctor: Doctor) {
    return this.groupService.findAll({
      where: { doctors: { some: { id: doctor.id } } },
    });
  }

  @ResolveField()
  jobs(@Parent() doctor: Doctor) {
    return this.jobService.findAll({
      where: { doctorId: doctor.id },
    });
  }

  @ResolveField()
  paymentMethods(@Parent() doctor: Doctor) {
    return this.paymentMethodService.findAll({
      where: { doctorId: doctor.id },
    });
  }

  @ResolveField()
  payments(@Parent() doctor: Doctor) {
    return this.paymentService.findAll({
      where: { doctorId: doctor.id },
    });
  }

  @ResolveField()
  jobTypes(@Parent() doctor: Doctor) {
    return this.jobTypeService.findAll({
      where: { doctorId: doctor.id },
    });
  }

  @ResolveField()
  groupInvites(@Parent() doctor: Doctor) {
    return this.groupInviteService.findAll({
      where: { doctorId: doctor.id },
    });
  }
}
