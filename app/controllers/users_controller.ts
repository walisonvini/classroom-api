import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import UserService from '#services/UserService'
import ApiResponse from '../helpers/api_response.js'

export default class UsersController {
  private userService = new UserService()

  public async store(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createUserValidator)

    const user = await this.userService.create(payload)

    return ApiResponse.success(ctx, { user }, `${user.role} created successfully`)
  }
}