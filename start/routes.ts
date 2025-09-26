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
import RoomsController from '#controllers/rooms_controller'

router.group(() => {
  router.post('login', [AuthController, 'login'])

  router.post('users', [UsersController, 'store'])
}).prefix('api')

router.group(() => {
  router.get('users/me', [UsersController, 'show'])
  router.put('users/me', [UsersController, 'update'])
  router.delete('users/me', [UsersController, 'delete'])

  router.post('rooms', [RoomsController, 'store'])
  router.get('rooms/:id', [RoomsController, 'show'])
  router.put('rooms/:id', [RoomsController, 'update'])
  router.delete('rooms/:id', [RoomsController, 'delete'])

  router.post('rooms/:id/students/:userId', [RoomsController, 'addStudent'])
  router.delete('rooms/:id/students/:userId', [RoomsController, 'removeStudent'])
  router.get('rooms/:id/students', [RoomsController, 'getStudents'])
  router.get('students/me/rooms', [RoomsController, 'getStudentRooms'])
}).use(middleware.auth({ guards: ['api'] })).prefix('api')