exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.hasTable('comments').then(exists => {
			if (!exists) {
				return knex.schema.createTable('comments', t => {
					t.increments('id').primary();
					t.text('comments');
					t.integer('users_id').unsigned();
					// relation with users role table because user has different role
					t.foreign('users_id')
						.references('id')
						.on('users');
					t.integer('posts_id').unsigned();
					// relation with users role table because user has different role
					t.foreign('posts_id')
						.references('id')
						.on('posts');
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
		knex.schema.hasTable('comments').then(exists => {
			if (exists) {
				return knex.schema.dropTable('comments');
			}
		})
	]);
};
