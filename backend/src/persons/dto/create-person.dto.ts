import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CreatePersonDto {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  friend: string;
}
