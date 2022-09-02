import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateDoctorInput implements Prisma.DoctorCreateManyInput {
  @Field()
  name: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
