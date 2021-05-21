const path = require("path");

module.exports = function override(config) {
	config.resolve = {
		...config.resolve,
		alias: {
			...config.alias,
			"@mbs/components": path.resolve(__dirname, "src/components"),
			"@mbs/contexts": path.resolve(__dirname, "src/contexts"),
			"@mbs/hooks": path.resolve(__dirname, "src/hooks"),
			"@mbs/pages": path.resolve(__dirname, "src/pages"),
			"@mbs/interfaces": path.resolve(__dirname, "src/interfaces"),
			"@mbs/routes": path.resolve(__dirname, "src/routes"),
			"@mbs/services": path.resolve(__dirname, "src/services"),
			"@mbs/utils": path.resolve(__dirname, "src/utils"),
		},
	};

	return config;
};
