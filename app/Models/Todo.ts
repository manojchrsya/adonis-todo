import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public task: string

  @column()
  public is_completed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value) => value.toFormat('dd LLL yyyy'),
  })
  public updatedAt: DateTime
}
