require('ts-node/register/transpile-only');

exports.allRuntimeEnvironments = {
  DEBUG: 'debug',
  RELEASE: 'release',
};

exports.RUNTIME_ENVIRONMENT = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return exports.allRuntimeEnvironments.DEBUG;
    case 'production':
      return exports.allRuntimeEnvironments.RELEASE;
    default:
      throw new Error('Unknown environment. Make sure NODE_ENV is set.');
  }
})();

const tsConfig = require(exports.RUNTIME_ENVIRONMENT === exports.allRuntimeEnvironments.DEBUG
  ? './tsconfig.json'
  : `./tsconfig.${exports.RUNTIME_ENVIRONMENT}.json`);
const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
  baseUrl: './',
  paths: tsConfig.compilerOptions.paths,
});
