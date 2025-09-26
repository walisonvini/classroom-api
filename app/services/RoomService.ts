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

  async addStudent(roomId: number, userId: number, authUser: User) {
    const room = await this.findById(roomId, authUser)
    const student = await this.userService.findById(userId)

    await this.userService.verifyIsStudent(student)
    await this.validateRoomAvailability(room)

    if (await this.validateStudentInRoom(room, student.id)) {
      throw new Error('Student already in room')
    }

    await this.validateRoomCapacity(room)

    return await room.related('roomStudents').create({
      studentId: student.id,
    });
  }

  async removeStudent(roomId: number, userId: number, authUser: User) {
    const room = await this.findById(roomId, authUser)
    const student = await this.userService.findById(userId)

    await this.userService.verifyIsStudent(student)

    if (!await this.validateStudentInRoom(room, student.id)) {
      throw new Error('Student not in room')
    }

    return await room.related('roomStudents').query().where('student_id', student.id).delete()
  }

  private async validateRoomAvailability(room: Room) {
    if (!room.available) {
      throw new Error('Room is not available')
    }
  }

  private async validateRoomCapacity(room: Room) {
    const result = await room
    .related('roomStudents')
    .query()
    .count('* as total')

    const total = Number(result[0].$extras.total)

    if (total >= room.capacity) {
      throw new Error('Room has reached maximum capacity')
    }
  }

  private async validateStudentInRoom(room: Room, studentId: number) {
    const roomStudent = await room.related('roomStudents').query().where('student_id', studentId).first()
    
    return roomStudent
  }
}