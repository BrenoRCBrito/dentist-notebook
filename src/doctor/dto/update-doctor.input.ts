import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsAlpha,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { int, intArray } from '../../graphql-type-functions/type-functions';

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
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field({ nullable: true })
  @IsOptional()
  @IsAlpha()
  name?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsAlpha()
  lastName?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
  @Field(intArray, { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  groups?: number[];
}
