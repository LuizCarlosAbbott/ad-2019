import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './interfaces/person.interface';
import { PersonInput } from './input-persons';

@Injectable()
export class PersonsService {
  constructor(@InjectModel('Person') private personModel: Model<Person>) {}

  async create(createPersonDto: PersonInput): Promise<Person> {
    const createdPerson = new this.personModel(createPersonDto);
    return createdPerson.save();
  }

  async findAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }
}
