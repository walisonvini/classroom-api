import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import { DateTime } from 'luxon'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'John Doe',
        email: 'john@doe.com',
        password: 'password',
        birthDate: DateTime.fromJSDate(new Date('1990-01-01')),
        role: 'teacher',
        registration: '2025123456T'
      },
      {
        fullName: 'Victor Pires',
        email: 'victor@pires.com',
        password: 'password',
        birthDate: DateTime.fromJSDate(new Date('2000-01-01')),
        role: 'student',
        registration: '2025123457S'
      }
    ])

    await UserFactory.createMany(10)
  }
}