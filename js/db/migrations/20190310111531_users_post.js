exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.hasTable('posts').then(exists => {
			if (!exists) {
				return knex.schema.createTable('users', t => {
					t.increments('id').primary();
					t.string('title').notNullable();
					t.string('details', 'text');
					t.integer('user_id').unsigned();
					// relation with users role table because user has different role
					t.foreign('user_id')
						.references('id')
						.on('users');
					t.timestamp('created_at').defaultTo(knex.fn.now());
					t.timestamp('updated_at').defaultTo(knex.fn.now());
				});
			} else {
				return new Error('user table allready exists');
			}
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.hasTable('posts').then(exists => {
			if (exists) {
				return knex.schema.dropTable('posts');
			}
		})
	]);
};
