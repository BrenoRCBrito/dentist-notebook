import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsAlpha, IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { intArray } from '../../graphql-type-functions/type-functions';

interface SimplifyRelationFields {
  //  The original prisma object shape for connecting Many to Many rows is:
  //  { data: $relationField: { connect: [ { id:1 }, { id:2 } ] } }.
  //  Where the we specify in the connect key the row's ids that we want to connect.
  //  In this case $relationField would be either groups or doctors.
  //  I can't afford to use that shape in a graphQl query,
  //  so I'll use a simple number list and handle the object in the service layer.
  groups?: number[];
  doctors?: number[];
}

@InputType()
export class CreateClientInput
  implements Prisma.ClientCreateManyInput, SimplifyRelationFields
{
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;
  @Field()
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;
  @Field(intArray, { defaultValue: [0] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  groups?: number[];
  @Field(intArray, { defaultValue: [0] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  doctors?: number[];
}
