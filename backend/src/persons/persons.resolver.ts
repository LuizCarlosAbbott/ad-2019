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

  @Query(() => CreatePersonDto, { nullable: true })
  async person(@Args('id') id: string) {
    const person = await this.personsService.findOne(id);
    return person[0];
  }

  @Mutation(() => CreatePersonDto)
  async createPerson(@Args('input') input: PersonInput) {
    return this.personsService.create(input);
  }

  @Mutation(() => CreatePersonDto)
  async deletePerson(@Args('id') id: string) {
    const person = await this.personsService.findOne(id);

    await this.personsService.deletePerson(id);
    return person[0];
  }
}
