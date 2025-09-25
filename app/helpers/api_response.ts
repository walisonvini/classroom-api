import { HttpContext } from '@adonisjs/core/http'

export default class ApiResponse {
  public static success(
    { response }: HttpContext,
    data: any,
    message = 'Operation successful',
    code = 200
  ) {
    return response.status(code).json({
      success: true,
      message,
      data,
    })
  }

  public static error(
    { response }: HttpContext,
    message: string,
    code = 400,
    errors: any = null
  ) {
    const body: any = {
      success: false,
      message,
    }

    if (errors) {
      body.errors = errors
    }

    return response.status(code).json(body)
  }
}
