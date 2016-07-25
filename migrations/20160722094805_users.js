
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments()
    table.string('username')
    table.string('password')
    table.string('firstName')
    table.string('lastName')
    table.string('email')
    table.integer('age')
    table.integer('level')
    table.string('remeber_token')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
