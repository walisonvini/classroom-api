import vine from '@vinejs/vine'

export const createRoomValidator = vine.compile(
    vine.object({
        roomNumber: vine.string().trim(),
        capacity: vine.number().positive(),
        available: vine.boolean()
    })
)