import Room from '#models/room'
import User from '#models/user'

import UserService from '#services/UserService'

export default class RoomService {
  private userService = new UserService()

  async create(payload: any, user: User) {
    await this.userService.verifyIsTeacher(user)

    const room = await Room.create({
      ...payload,
      teacherId: user.id,
    })

    return room
  }

  async findById(id: number, user: User) {
   
    const room = await Room.query()
      .where('id', id)
      .andWhere('teacher_id', user.id)
      .first()

    if (!room) {
      throw new Error('Room not found')
    }

    return room
  }

  async update(id: number, payload: any, user: User) {
    const room = await this.findById(id, user)

    return await room.merge(payload).save()
  }

  async delete(id: number, user: User) {
    const room = await this.findById(id, user)

    return await room.delete()
  }
}