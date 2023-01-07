const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			webpackConfig.output.publicPath = 'auto';

			const htmlWebpackPlugin = webpackConfig.plugins.find(
				(plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
			);

			htmlWebpackPlugin.userOptions = {
				...htmlWebpackPlugin.userOptions,
				publicPath: paths.publicUrlOrPath,
				excludeChunks: ['remote'],
			};

			webpackConfig.plugins = [
				...webpackConfig.plugins,
				new ModuleFederationPlugin({
					name: 'host',
					remotes: {
						remote: 'remote@http://localhost:3002/remoteEntry.js',
					},
					exposes: {},
					filename: 'remoteEntry.js',
					shared: {
						...deps,
						react: {
							singleton: true,
							eager: true,
							requiredVersion: deps['react'],
						},
						'react-dom': {
							singleton: true,
							eager: true,
							requiredVersion: deps['react-dom'],
						},
					},
				}),
			];

			return webpackConfig;
		},
	},
};
