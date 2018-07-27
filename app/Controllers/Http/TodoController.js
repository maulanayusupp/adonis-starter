'use strict'

const { validateAll } = use('Validator');
const Todo = use('App/Models/Todo');
const Database = use('Database');

class TodoController {
	async index({view}) {
		const todos = await Database
		.table('todos')
		.orderBy('id', 'desc');

		var data = {
			todos: todos,
		};
		return view.render('todos.index', data);
	}

	async store({request, response, session}) {

		const body = request.all();

		const rules = {
			name: 'required|min:8'
		};
		const messages = {
			'name.required': 'Please provide a todo.',
			'name.min': 'Your todo is not long enough.',
		};

		const validator = await validateAll(body, rules, messages);
		if (validator.fails()) {

			session.withErrors(validator.messages()).flashAll();

			return response.redirect('/todos');
		}

		var name = request.input('name');

		const todo = new Todo();
		todo.name = name;
		await todo.save();

		session.flash({ notification: 'Todo created succesfully' });

		return response.redirect('/todos');
	}

	async destroy({response, session, params}) {
		const todo = await Todo.find(params.id);

		if (todo) {
			const temp = todo;
			await todo.delete();

			session.flash({notification: `${temp.name} todo deleted`});
			return response.redirect('/todos')
		}

		session.flash({notification: 'todo not found'});
		return response.redirect('/todos')
	}

	async edit({response, session, params, view}) {
		const todo = await Todo.find(params.id);

		if (todo) {
			return view.render('todos.edit', { todo });
		}

		session.flash({notification: 'todo not found'});
		return response.redirect('/todos');
	}

	async update({response, request, session, params}) {
		const todo = await Todo.find(params.id);

		if (todo) {
			todo.name = request.input('name');
			await todo.save();

			session.flash({notification: `${todo.name} updated`});
			return response.redirect('/todos');
		}

		session.flash({notification: 'todo not found'});
		return response.redirect('/todos');
	}
}

module.exports = TodoController
