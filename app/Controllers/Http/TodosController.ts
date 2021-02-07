import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({ request, view }: HttpContextContract) {
    const todos = await Todo.all()
    const query = request.only(['id'])
    return view.render('index', { todos, editable_id: query.id })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const todo = await Todo.findOrFail(id)
    const body = request.only(['is_completed'])
    if (todo && body.is_completed) {
      todo.is_completed = body.is_completed
      await todo.save()
    }
    response.redirect('/')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const todo = await Todo.findOrFail(id)
    if (todo) {
      await todo.delete()
    }
    response.redirect('/')
  }
}
