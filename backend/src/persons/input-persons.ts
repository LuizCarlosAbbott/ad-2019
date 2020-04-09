import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class PersonInput {
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
}
