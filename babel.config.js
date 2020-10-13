module.exports = function (api) {
	api.cache(true);
	const presets = [
		[
			'@babel/preset-env'
		],
		[
			'@babel/react'
		],
		// [
		// 	'@babel/stage-0'
		// ]
	];
	const plugins = ['@babel/plugin-proposal-function-bind'];

	return {
		presets,
		plugins
	};
};