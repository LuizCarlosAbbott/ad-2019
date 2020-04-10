import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './interfaces/person.interface';
import { PersonInput } from './input-persons';
import * as nodemailer from 'nodemailer';

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

  send(persons: Person[]): void {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_DOMAIN,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const size = persons.length;
    let i = 0;

    const myInterval = setInterval(() => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: persons[i].email,
        subject: 'Seu Amigo Secreto',
        text: persons[i].friend + ' é seu amigo secreto',
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      i < size - 1 ? i++ : clearInterval(myInterval);
    }, 1000);
  }

  async sortAndSend(): Promise<Person[]> {
    const persons = await this.personModel.find().exec();
    const friends = Array(persons.length);

    for (let i = 0; i < persons.length; i++) {
      const excluidos = [];
      const auxPersons = [...persons];
      if (i === 0) {
        excluidos.push(persons[i]);
        auxPersons.slice(i, 1);

        let valor = Math.floor(Math.random() * auxPersons.length);
        friends[i] = auxPersons[valor];
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

        let valor = Math.floor(Math.random() * auxPersons.length);
        friends[i] = auxPersons[valor];
      }
    }

    await persons.map(async ({ _id, name, email }, index) => {
      await this.personModel.findByIdAndUpdate(
        _id,
        { name: name, email: email, friend: friends[index].name },
        { new: true },
      );
    });

    const personSend = await this.personModel.find().exec();

    this.send(personSend);

    return personSend;
  }
}
