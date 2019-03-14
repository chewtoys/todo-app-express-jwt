module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
		jest: true
	},
	extends: 'eslint:recommended',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},

	rules: {
		'no-console': 'off',
		semi: 'off',
		'space-before-function-paren': 'off'
	}
};
