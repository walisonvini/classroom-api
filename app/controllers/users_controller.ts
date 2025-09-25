import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import UserService from '#services/UserService'

export default class UsersController {
  private userService = new UserService()

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    const user = await this.userService.create(payload)

    return user
  }
}