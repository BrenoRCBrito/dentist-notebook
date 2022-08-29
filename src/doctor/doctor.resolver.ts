import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DoctorService } from './doctor.service';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';

@Resolver('Doctor')
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @Mutation('createDoctor')
  create(@Args('createDoctorInput') createDoctorInput: CreateDoctorInput) {
    return this.doctorService.create(createDoctorInput);
  }

  @Query('doctor')
  findAll() {
    return this.doctorService.findAll();
  }

  @Query('doctor')
  findOne(@Args('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Mutation('updateDoctor')
  update(@Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput) {
    return this.doctorService.update(updateDoctorInput);
  }

  @Mutation('removeDoctor')
  remove(@Args('id') id: string) {
    return this.doctorService.remove(id);
  }
}
