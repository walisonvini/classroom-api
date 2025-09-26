import type { HttpContext } from '@adonisjs/core/http'
import { createRoomValidator, updateRoomValidator } from '#validators/room'
import ApiResponse from '../helpers/api_response.js'
import RoomService from '#services/RoomService'
import User from '#models/user'

export default class RoomsController {
    private roomService = new RoomService()

    async store(ctx: HttpContext) {
        const payload = await ctx.request.validateUsing(createRoomValidator)
 
        const room = await this.roomService.create(payload, ctx.auth.user as User)

        return ApiResponse.success(ctx, { room }, 'Room created successfully', 201)
    }

    async show(ctx: HttpContext) {
        const room = await this.roomService.findById(ctx.params.id, ctx.auth.user as User)

        return ApiResponse.success(ctx, { room }, 'Room retrieved successfully')
    }

    async update(ctx: HttpContext) {
        const payload = await ctx.request.validateUsing(updateRoomValidator)

        const room = await this.roomService.update(ctx.params.id, payload, ctx.auth.user as User)

        return ApiResponse.success(ctx, { room }, 'Room updated successfully')
    }

    async delete(ctx: HttpContext) {
        await this.roomService.delete(ctx.params.id, ctx.auth.user as User)

        return ApiResponse.success(ctx, null, 'Room deleted successfully')
    }

    async addStudent(ctx: HttpContext) {
    
        await this.roomService.addStudent(ctx.params.id, ctx.params.userId, ctx.auth.user as User)

        return ApiResponse.success(ctx, {}, 'Student added to room successfully', 201)
    }

    async removeStudent(ctx: HttpContext) {
        await this.roomService.removeStudent(ctx.params.id, ctx.params.userId, ctx.auth.user as User)

        return ApiResponse.success(ctx, {}, 'Student removed from room successfully')
    }
}