'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route');
const Todo = use('App/Models/Todo');

Route.get('/user/profile', 'ProfileController.profile');

Route.get('/todos', 'TodoController.index');
Route.post('/todos', 'TodoController.store').as('todos.store');
Route.get('/todos/delete/:id', 'TodoController.destroy').as('todos.destroy');
Route.get('/todos/edit/:id', 'TodoController.edit').as('todos.edit');
Route.post('/todos/update/:id', 'TodoController.update').as('todos.update');

/*Route.get('/test', async ({response}) => {
	const todo1 = await Todo.create({
		name: 'Makan terus'
	});
	const todo2 = await Todo.create({
		name: 'Makan lagi'
	});
	const todo3 = await Todo.create({
		name: 'Makan ena ena'
	});

	var todos = [];
	todos.push(todo1);
	todos.push(todo2);
	todos.push(todo3);

	return response.json(todos);
});*/