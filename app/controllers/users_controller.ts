import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user'
import UserService from '#services/UserService'
import ApiResponse from '../helpers/api_response.js'

export default class UsersController {
  private userService = new UserService()

  public async store(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createUserValidator)

    const user = await this.userService.create(payload)

    return ApiResponse.success(ctx, { user }, `${user.role} created successfully`, 201)
  }

  public async show(ctx: HttpContext) {
    const user = await this.userService.findById(ctx.auth.user?.id as number)
 
    return ApiResponse.success(ctx, { user }, 'User retrieved successfully')
  }

  public async update(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(updateUserValidator)

    const user = await this.userService.update(ctx.auth.user?.id as number, payload)

    return ApiResponse.success(ctx, { user }, 'User updated successfully')
  }

  public async delete(ctx: HttpContext) {
    await this.userService.delete(ctx.auth.user?.id as number)

    return ApiResponse.success(ctx, null, 'User deleted successfully')
  }
}