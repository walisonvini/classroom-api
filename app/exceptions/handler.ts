import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import ApiResponse from '../helpers/api_response.js'
import Logger from '@adonisjs/core/services/logger'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    // Check if it's a validation error (VineJS format)
    if (error && typeof error === 'object' && 'messages' in error && (error as any).code === 'E_VALIDATION_ERROR') {
      return ApiResponse.error(ctx, 'Validation failed', 422, (error as any).messages)
    }

    // Other errors
    Logger.error(error)
    const status = (error as any)?.status || 500
    const message = (error as any)?.message || 'Internal server error'
    return ApiResponse.error(ctx, message, status)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
