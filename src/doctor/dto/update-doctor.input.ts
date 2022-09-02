import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

interface SimplifyRelationFields {
  //  The original prisma object shape for connecting Many to Many rows is:
  //  { data: $relationField: { connect: [ { id:1 }, { id:2 } ] } }.
  //  Where the we specify in the connect key the row's ids that we want to connect.
  //  In this case $relationField would be either groups or doctors.
  //  I can't afford to use that shape in a graphQl query,
  //  so I'll use a simple number list and handle the object in the service layer.
  groups?: number[];
}

@InputType()
export class UpdateDoctorInput
  implements Prisma.DoctorUncheckedUpdateManyInput, SimplifyRelationFields
{
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  password?: string;
  @Field(() => [Int], { nullable: 'itemsAndList' })
  groups?: number[];
}
