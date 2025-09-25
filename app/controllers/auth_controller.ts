import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import ApiResponse from '../helpers/api_response.js'
import AuthService from '#services/AuthService'

export default class AuthController {
  private authService = new AuthService()
  
  async login(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(loginValidator)
    const token = await this.authService.login(payload, ctx)

    return ApiResponse.success(ctx, { token }, 'Login successful')
  }
}