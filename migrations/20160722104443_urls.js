
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('urls', function (table) {
    table.increments()
    table.integer('pid')
    table.string('torrent')
    table.string('xdcc')
    table.string('ddl')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('urls')
}
