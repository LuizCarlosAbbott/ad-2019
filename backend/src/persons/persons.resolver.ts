import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonInput } from './input-persons';

@Resolver('Persons')
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @Query(() => [CreatePersonDto])
  async persons(): Promise<CreatePersonDto[]> {
    return this.personsService.findAll();
  }

  @Query(() => CreatePersonDto, { nullable: true })
  async person(@Args('id') id: string): Promise<CreatePersonDto> {
    return await this.personsService.findOne(id);
  }

  @Mutation(() => CreatePersonDto)
  async createPerson(
    @Args('input') input: PersonInput,
  ): Promise<CreatePersonDto> {
    return this.personsService.create(input);
  }

  @Mutation(() => CreatePersonDto)
  async deletePerson(@Args('id') id: string): Promise<CreatePersonDto> {
    const person = await this.personsService.findOne(id);

    await this.personsService.deletePerson(id);
    return person;
  }

  @Mutation(() => CreatePersonDto)
  async updatePerson(
    @Args('id') id: string,
    @Args('input') input: PersonInput,
  ): Promise<CreatePersonDto> {
    return await this.personsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deletePersons(): Promise<Boolean> {
    return await this.personsService.deletePersons();
  }

  @Mutation(() => [CreatePersonDto])
  async sortFriend(): Promise<CreatePersonDto[]> {
    return await this.personsService.sortAndSend();
  }
}
