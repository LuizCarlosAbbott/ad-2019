import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './persons.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }]),
  ],
  providers: [PersonsService, PersonsResolver],
})
export class PersonsModule {}
