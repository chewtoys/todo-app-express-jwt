exports.up = (knex, Promise) => {
	return Promise.all([
		knex.schema.hasTable('users').then(exists => {
			if (!exists) {
				return knex.schema.createTable('users', t => {
					t.increments('id').primary();
					t.string('user_name').notNullable();
					t.string('email').notNullable();
					t.string('password', 255);
					t.integer('users_id').unsigned();
					t.string('confirm_token', 100);
					t.boolean('send_mail');
					t.boolean('confirm');
					t.boolean('approval');
					t.string('resetpassword_token', 100);
					t.boolean('reset_password');
					// relation with users role table because user has different role
					t.foreign('users_id')
						.references('id')
						.on('users_role');
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
		knex.schema.hasTable('users').then(exists => {
			if (exists) {
				return knex.schema.dropTable('users');
			}
		})
	]);
};
// https://stackoverflow.com/questions/35089571/knex-js-create-table-and-insert-data
