exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('users_role').then(exists => {
      if (!exists) {
        return knex.schema.createTable('users_role', t => {
          t.increments('id').primary()
          t.string('role_name').notNullable()
          t.string('status').notNullable()
          t.string('description', 255)
        })
      } else {
        return new Error('user table allready exists')
      }
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('users_role').then(exists => {
      if (exists) {
        return knex.schema.dropTable('users_role')
      }
    })
  ])
}
