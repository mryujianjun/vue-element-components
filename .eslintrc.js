// 不能使用 es6 export deafult
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	rules: {},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
