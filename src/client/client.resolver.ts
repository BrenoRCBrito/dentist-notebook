import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GroupService } from '../group/group.service';
import { DoctorService } from '../doctor/doctor.service';
import { ClientService } from './client.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';
import { JobService } from '../job/job.service';
import { PaymentService } from '../payment/payment.service';

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
    return this.clientService.create(createClientInput);
  }

  @Query(() => [Client], { name: 'clients' })
  findAll() {
    return this.clientService.findAll();
  }

  @Query(() => Client, { name: 'client' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientService.findOne(id);
  }

  @Mutation(() => Client)
  updateClient(
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ) {
    return this.clientService.update(updateClientInput.id, updateClientInput);
  }

  @Mutation(() => Client)
  removeClient(@Args('id', { type: () => Int }) id: number) {
    return this.clientService.remove(id);
  }

  @ResolveField()
  doctors(@Parent() client: Client) {
    return this.doctorService.findAllByClient(client.id);
  }

  @ResolveField()
  groups(@Parent() client: Client) {
    return this.groupService.findAllByClient(client.id);
  }

  @ResolveField()
  jobs(@Parent() client: Client) {
    return this.jobService.findAllByClient(client.id);
  }

  @ResolveField()
  payments(@Parent() client: Client) {
    return this.paymentService.findAllByClient(client.id);
  }
}
