import { Module } from '@nestjs/common';
import { PersonsResolver } from './persons.resolver';

@Module({
  providers: [PersonsResolver],
})
export class PersonsModule {}
