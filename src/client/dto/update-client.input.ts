import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UpdateClientInput
  implements Prisma.ClientUncheckedUpdateManyInput
{
  @Field(() => Int)
  id: number;
  @Field()
  name?: string;
  @Field()
  lastName?: string;
}
