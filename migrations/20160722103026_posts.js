
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('posts', function (table) {
    table.increments()
    table.string('title')
    table.string('slug')
    table.text('content')
    table.boolean('draft')
    table.integer('aid')
    table.integer('uid')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}
