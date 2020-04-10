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

  async deletePersons(): Promise<Boolean> {
    const result = await this.personModel.deleteMany().exec();
    return result.ok === 1;
  }

  async update(id: string, person: PersonInput): Promise<Person> {
    return await this.personModel.findByIdAndUpdate(id, person, { new: true });
  }

  async sortAndSend(): Promise<Person[]> {
    const persons = await this.personModel.find().exec();
    const friends = Array(persons.length);

    for (let i = 0; i < persons.length; i++) {
      const excluidos = [];
      const auxPersons = [...persons];
      if (i === 0) {
        excluidos.push(persons[i]); // [Luiz]
        auxPersons.slice(i, 1); // [Joel, Maria]

        let valor = Math.floor(Math.random() * auxPersons.length);
        friends[i] = auxPersons[valor]; // [ Jeol || Maria, empty, empty]
      } else {
        excluidos.push(persons[i]);
        if (friends.includes(persons[i])) {
          let indexF;
          indexF = friends.indexOf(persons[i]);
          excluidos.push(persons[indexF]);
        }
        excluidos.map(e => {
          let indexEx = auxPersons.indexOf(e);
          auxPersons.splice(indexEx, 1);
        });
        // console.log(auxPersons);

        let valor = Math.floor(Math.random() * auxPersons.length);
        friends[i] = auxPersons[valor];
      }
    }
    console.log(persons, friends);
    await persons.map(async ({ _id, name, email }, index) => {
      await this.personModel.findByIdAndUpdate(
        _id,
        { name: name, email: email, friend: friends[index].name },
        { new: true },
      );
    });

    return await this.personModel.find().exec();
  }
}
