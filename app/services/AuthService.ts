import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthService {
  async login(payload: { email: string, password: string }, ctx: HttpContext) {
    const { email, password } = payload

    const user = await User.verifyCredentials(email, password)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token =await ctx.auth.use('api').createToken(user)

    return token
  }
}