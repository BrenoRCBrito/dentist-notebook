import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
  @Field()
  access: string;
  @Field()
  refresh: string;
}
