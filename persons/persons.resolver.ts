import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class PersonsResolver {
  // constructor(
  //   private authorsService: AuthorsService,
  //   private postsService: PostsService,
  // ) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
