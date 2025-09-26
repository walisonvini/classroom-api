import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'password',
      birthDate: DateTime.fromJSDate(faker.date.birthdate()),
      role: faker.helpers.arrayElement(['teacher', 'student']),
      registration: faker.string.alphanumeric(10)
    }
  })
  .build()