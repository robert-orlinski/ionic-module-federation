const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
	webpack: {
		configure: {
			output: {
				publicPath: 'auto',
			},
		},
		plugins: {
			add: [
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
			],
		},
	},
};
