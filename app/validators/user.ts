import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string(),
    registration: vine.string().trim().unique({ table: 'users', column: 'registration' }),
    birthDate: vine.date(),
    role: vine.enum(['teacher', 'student'])
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().optional(),
    email: vine.string().email().unique({ table: 'users', column: 'email' }).optional(),
    password: vine.string().optional(),
    birthDate: vine.date().optional()
  })
)