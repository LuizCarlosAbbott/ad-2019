import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonInput } from './input-persons';
import { Person } from './interfaces/person.interface';

@Resolver('Persons')
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @Query(() => [CreatePersonDto])
  async persons() {
    return this.personsService.findAll();
  }

  @Query(() => CreatePersonDto, { nullable: true })
  async person(@Args('id') id: string) {
    return await this.personsService.findOne(id);
  }

  @Mutation(() => CreatePersonDto)
  async createPerson(@Args('input') input: PersonInput) {
    return this.personsService.create(input);
  }

  @Mutation(() => CreatePersonDto)
  async deletePerson(@Args('id') id: string) {
    const person = await this.personsService.findOne(id);

    await this.personsService.deletePerson(id);
    return person;
  }

  @Mutation(() => CreatePersonDto)
  async updatePerson(
    @Args('id') id: string,
    @Args('input') input: PersonInput,
  ) {
    return this.personsService.update(id, input);
  }
}
