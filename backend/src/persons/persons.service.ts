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

  async findOne(id: String): Promise<Person> {
    return await this.personModel.findOne({ _id: id }).exec();
  }

  async deletePerson(id: String): Promise<Person> {
    return this.personModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, person: PersonInput): Promise<Person> {
    return await this.personModel.findByIdAndUpdate(id, person, { new: true });
  }
}
