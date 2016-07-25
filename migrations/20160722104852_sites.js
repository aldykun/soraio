
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('sites', function (table) {
    table.increments()
    table.string('key')
    table.string('value')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sites')
}
