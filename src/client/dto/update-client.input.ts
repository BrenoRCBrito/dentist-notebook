import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateClientInput
  implements Prisma.ClientUncheckedUpdateManyInput
{
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @Field()
  @IsOptional()
  @IsAlpha()
  name?: string;
  @Field()
  @IsOptional()
  @IsAlpha()
  lastName?: string;
}
