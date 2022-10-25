import { InputType } from '@nestjs/graphql';
import { CreateDoctorInput } from '../../doctor/dto/create-doctor.input';

@InputType()
export class SignUpInput extends CreateDoctorInput {}
