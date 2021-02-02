import Factory from '@ioc:Adonis/Lucid/Factory'
import Todo from 'App/Models/Todo'

export const TodoFactory = Factory.define(Todo, ({ faker }) => {
  return {
    task: faker.lorem.sentence(),
    is_completed: faker.random.boolean(),
  }
}).build()
