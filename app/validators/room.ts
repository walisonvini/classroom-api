import vine from '@vinejs/vine'

export const createRoomValidator = vine.compile(
    vine.object({
        roomNumber: vine.string().trim().unique({ table: 'rooms', column: 'room_number' }),
        capacity: vine.number().positive(),
        available: vine.boolean()
    })
)

export const updateRoomValidator = vine.compile(
    vine.object({
        roomNumber: vine.string().trim().unique({ table: 'rooms', column: 'room_number' }).optional(),
        capacity: vine.number().positive().optional(),
        available: vine.boolean().optional()
    })
)