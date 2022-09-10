import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DoctorService } from '../doctor/doctor.service';
import {
  client,
  clientArray,
  int,
} from '../graphql-type-functions/type-functions';
import { GroupService } from '../group/group.service';
import { JobService } from '../job/job.service';
import { PaymentService } from '../payment/payment.service';
import mapManyToManyUpdateInput from '../utils/mapManyToManyUpdateInput';
import { ClientService } from './client.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Resolver(client)
export class ClientResolver {
  constructor(
    private readonly clientService: ClientService,
    private readonly doctorService: DoctorService,
    private readonly groupService: GroupService,
    private readonly jobService: JobService,
    private readonly paymentService: PaymentService,
  ) {}

  @Mutation(client)
  createClient(
    @Args('createClientInput') createClientInput: CreateClientInput,
  ) {
    let checkedInput;
    if (
      Array.isArray(createClientInput.doctors) &&
      createClientInput.doctors.length > 0
    ) {
      checkedInput = mapManyToManyUpdateInput(createClientInput);
    } else checkedInput = createClientInput;
    return this.clientService.create({ data: checkedInput });
  }

  @Query(clientArray, { name: 'clients' })
  findAll() {
    return this.clientService.findAll();
  }

  @Query(client, { name: 'client' })
  findOne(@Args('id', { type: int }) id: number) {
    return this.clientService.findOne({ where: { id } });
  }

  @Mutation(client)
  updateClient(
    @Args('updateClientInput') updateClientInput: UpdateClientInput,
  ) {
    return this.clientService.update({
      where: { id: updateClientInput.id },
      data: updateClientInput,
    });
  }

  @Mutation(client)
  removeClient(@Args('id', { type: int }) id: number) {
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
