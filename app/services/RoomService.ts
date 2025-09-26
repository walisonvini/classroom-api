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
}