import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TodoValidator from 'App/Validators/TodoValidator'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({ request, view }: HttpContextContract) {
    const query = request.only(['id', 'is_completed'])
    const models = Todo.query()
    if (query.is_completed) {
      models.where({ is_completed: query.is_completed })
    }
    const results = await models
    const todos = results.map((result) => result.toJSON())
    return view.render('index', { todos, query })
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(TodoValidator)
    const todo = new Todo()
    todo.task = data.task
    todo.is_completed = false
    return todo.save()
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const todo = await Todo.findOrFail(id)
    const body = request.only(['is_completed', 'task'])
    todo.task = body.task || todo.task
    todo.is_completed = body.is_completed || todo.is_completed
    return todo.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params
    const todo = await Todo.findOrFail(id)
    if (todo) {
      await todo.delete()
    }
    return { message: 'Record Deleted successfully;' }
  }
}
