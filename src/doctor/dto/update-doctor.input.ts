import { Optional } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsAlpha,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

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
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field({ nullable: true })
  @Optional()
  @IsAlpha()
  name?: string;
  @Field({ nullable: true })
  @Optional()
  @IsAlpha()
  lastName?: string;
  @Field({ nullable: true })
  @Optional()
  @IsEmail()
  email?: string;
  @Field({ nullable: true })
  @Optional()
  @IsString()
  @MinLength(8)
  password?: string;
  @Field(() => [Int], { nullable: 'itemsAndList' })
  @Optional()
  @IsArray()
  @IsNumber({}, { each: true })
  groups?: number[];
}
