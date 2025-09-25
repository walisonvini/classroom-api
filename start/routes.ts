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

router.group(() => {
  router.post('users', [UsersController, 'store'])
}).prefix('api')

router.group(() => {
 
}).use(middleware.auth({
  guards: ['api']
})).prefix('api')