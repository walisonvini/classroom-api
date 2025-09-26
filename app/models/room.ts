import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import RoomStudent from '#models/room_student'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roomNumber: string

  @column()
  declare capacity: number

  @column()
  declare available: boolean

  @column()
  declare teacherId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'teacherId'
  })
  declare teacher: BelongsTo<typeof User>

  @hasMany(() => RoomStudent, {
    foreignKey: 'roomId'
  })
  declare roomStudents: HasMany<typeof RoomStudent>
}