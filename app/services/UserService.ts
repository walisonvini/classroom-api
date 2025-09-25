import User from '#models/user'
import { DateTime } from 'luxon'

export default class UserService {
  public async create(payload: any) {
    const user = await User.create({
      ...payload,
      birthDate: DateTime.fromJSDate(payload.birthDate),
    })

    return user
  }
}
