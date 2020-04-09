import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonInput } from './input-persons';

@Resolver('Persons')
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @Query(() => [CreatePersonDto])
  async persons() {
    return this.personsService.findAll();
  }

  @Mutation(() => CreatePersonDto)
  async createPerson(@Args('input') input: PersonInput) {
    return this.personsService.create(input);
  }
}
