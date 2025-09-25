/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import UsersController from '#controllers/users_controller'
import AuthController from '#controllers/auth_controller'

router.group(() => {
  router.post('login', [AuthController, 'login'])

  router.post('users', [UsersController, 'store'])
}).prefix('api')

router.group(() => {
  router.get('users/me', [UsersController, 'show'])
  router.put('users/me', [UsersController, 'update'])
  router.delete('users/me', [UsersController, 'delete'])
}).use(middleware.auth({
  guards: ['api']
})).prefix('api')