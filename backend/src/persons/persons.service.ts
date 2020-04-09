import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './interfaces/person.interface';
import { PersonInput } from './input-persons';
import { CreatePersonDto } from './dto/create-person.dto';

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
    // console.log(await this.personModel.find({ _id: id }).exec());
    return await this.personModel.findOne({ _id: id }).exec();
  }

  async deletePerson(id: String): Promise<Person> {
    // const person = await this.

    return this.personModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, person: PersonInput): Promise<CreatePersonDto> {
    return await this.personModel.findByIdAndUpdate(id, person, { new: true });
  }
}
