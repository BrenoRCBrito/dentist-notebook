import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { int } from '../../graphql-type-functions/type-functions';

@InputType()
export class UpdateGroupInput implements Prisma.GroupUncheckedUpdateManyInput {
  @Field(int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsAlpha()
  name?: string;
  @Field(int)
  @IsOptional()
  @IsNumber()
  adminId?: number;
}
