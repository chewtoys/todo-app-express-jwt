exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return Promise.all([
		knex('users_role')
			.del()
			.then(function() {
				// Inserts seed entries
				return knex('users_role').insert([
					{ role_name: 'ADMIN', status: '1', description: 'Admin' },
					{ role_name: 'USER', status: '1', description: 'user' },
					{ role_name: 'SYSTEM_ADMIN', status: '1', description: 'system admin' }
				]);
			})
	]);
};
