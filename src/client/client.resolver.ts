import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import mapManyToManyUpdateInput from '../utils/mapManyToManyUpdateInput';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { JobService } from '../job/job.service';
import { PaymentService } from '../payment/payment.service';
import { ClientService } from './client.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Resolver(() => Client)
export class ClientResolver {
  constructor(
    private readonly clientService: ClientService,
    private readonly doctorService: DoctorService,
    private readonly groupService: GroupService,
    private readonly jobService: JobService,
    private readonly paymentService: PaymentService,
  ) {}

  @Mutation(() => Client)
  createClient(
    @Args('createClientInput') createClientInput: CreateClientInput,
  ) {
    let checkedInput;
    if (
      Array.isArray(createClientInput.groups) &&
      createClientInput.groups.length > 0
    ) {
      checkedInput = mapManyToManyUpdateInput(createClientInput);
    } else checkedInput = createClientInput;
    return this.clientService.create({ data: checkedInput });
  }

  @Query(() => [Client], { name: 'clients' })
  findAll() {
    return this.clientService.findAll();
  }

  @Query(() => Client, { name: 'client' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientService.findOne({ where: { id } });
  }

  @Mutation(() => Client)
  updateClient(
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ) {
    return this.clientService.update({
      where: { id: updateClientInput.id },
      data: updateClientInput,
    });
  }

  @Mutation(() => Client)
  removeClient(@Args('id', { type: () => Int }) id: number) {
    return this.clientService.remove({ where: { id } });
  }

  @ResolveField()
  doctors(@Parent() client: Client) {
    return this.doctorService.findAll({
      where: {
        clients: {
          some: {
            id: client.id,
          },
        },
      },
    });
  }

  @ResolveField()
  groups(@Parent() client: Client) {
    return this.groupService.findAll({
      where: {
        clients: {
          some: {
            id: client.id,
          },
        },
      },
    });
  }

  @ResolveField()
  jobs(@Parent() client: Client) {
    return this.jobService.findAll({
      where: {
        clientId: client.id,
      },
    });
  }

  @ResolveField()
  payments(@Parent() client: Client) {
    return this.paymentService.findAll({
      where: {
        clientId: client.id,
      },
    });
  }
}
