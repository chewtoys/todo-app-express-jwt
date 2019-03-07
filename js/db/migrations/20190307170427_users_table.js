exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.hasTable('users').then(exists => {
      if (!exists) {
        return knex.schema.createTable('users', t => {
          t.increments('id').primary()
          t.string('user_name').notNullable()
          t.string('email').notNullable()
          t.string('password', 255).notNullable()
          t.integer('users_id').unsigned()
					// relation with users role table because user has different role
          t.foreign('users_id')
						.references('id')
						.on('users_role')
          t.timestramp('created_at').defaultTo(knex.fn.now())
          t.timestramp('updated_at').defaultTo(knex.fn.now())
        })
      } else {
        return new Error('user table allready exists')
      }
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('users').then(exists => {
      if (exists) {
        return knex.schema.dropTable('users')
      }
    })
  ])
}
// https://stackoverflow.com/questions/35089571/knex-js-create-table-and-insert-data
