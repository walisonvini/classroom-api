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

  public async findById(id: number) {
    const user = await User.find(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  public async update(id: number, payload: any) {
    const user = await this.findById(id)

    return await user.merge(payload).save()
  }

  public async delete(id: number) {
    const user = await this.findById(id)

    return await user.delete()
  }
}
