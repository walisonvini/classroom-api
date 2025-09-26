import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Room from '#models/room'
import User from '#models/user'

export default class RoomStudent extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roomId: number

  @column()
  declare studentId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Room, {
    foreignKey: 'roomId'
  })
  declare room: BelongsTo<typeof Room>

  @belongsTo(() => User, {
    foreignKey: 'studentId',
  })
  declare student: BelongsTo<typeof User>
}