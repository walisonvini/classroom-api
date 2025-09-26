import type { HttpContext } from '@adonisjs/core/http'
import { createRoomValidator } from '#validators/room'
import ApiResponse from '../helpers/api_response.js'
import RoomService from '#services/RoomService'
import User from '#models/user'

export default class RoomsController {
    private roomService = new RoomService()

    async store(ctx: HttpContext) {
        const payload = await ctx.request.validateUsing(createRoomValidator)
 
        const room = await this.roomService.create(payload, ctx.auth.user as User)

        return ApiResponse.success(ctx, { room }, 'Room created successfully')
    }
}