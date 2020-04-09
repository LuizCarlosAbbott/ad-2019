import { Resolver, Query } from '@nestjs/graphql';

@Resolver('Persons')
export class PersonsResolver {
  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
