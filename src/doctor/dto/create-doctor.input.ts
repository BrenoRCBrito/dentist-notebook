import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateDoctorInput implements Prisma.DoctorCreateManyInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsAlpha()
  name: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
