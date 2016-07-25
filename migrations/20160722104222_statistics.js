
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('statistics', function (table) {
    table.increments()
    table.integer('uid')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('statistics')
}
