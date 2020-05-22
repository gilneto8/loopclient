const { RUNTIME_ENVIRONMENT, allRuntimeEnvironments } = require('./bootstrap-build-environment');

const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const childProcess = require('child_process');

const { introspectionQuery, graphql } = require('gatsby/graphql');

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exec = promisify(childProcess.exec);

async function saveGraphQLSchemaToFile(store) {
  const { schema } = store.getState();
  if (!schema) throw new Error();

  const graphQlSchema = await graphql(schema, introspectionQuery);

  const dir = path.join(__dirname, '_graphql-generated_');

  if (!(await exists(dir))) {
    await mkdir(dir);
  }
  await writeFile(path.join(dir, 'schema.json'), JSON.stringify(graphQlSchema));
}

exports.onCreateWebpackConfig = async ({ actions, stage, getConfig, store }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, `src`),
        '@config': path.resolve(__dirname, `__config.${RUNTIME_ENVIRONMENT}`),
        ...(RUNTIME_ENVIRONMENT === allRuntimeEnvironments.DEBUG
          ? {
            'react-dom': '@hot-loader/react-dom',
          }
          : {}),
      },
    },
  });

  const { schema } = store.getState();
  if (!schema) throw new Error();

  /*
    TODO: move this to eslint config file, and import that new file here
    This will allow to use the --fix option in ESLint.
  */

  const gatsbyEslintConfig = require('gatsby/dist/utils/eslint-config').eslintConfig(schema);

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'eslint-loader',
          include: [path.resolve(__dirname, 'src')],
          options: {
            ...gatsbyEslintConfig,
            emitError: false,
            emitWarning: false,
            failOnError: RUNTIME_ENVIRONMENT === allRuntimeEnvironments.RELEASE,
            failOnWarning: RUNTIME_ENVIRONMENT === allRuntimeEnvironments.RELEASE,
            parserOptions: {
              ...gatsbyEslintConfig.parserOptions,
              project: path.resolve(__dirname, 'tsconfig.json'),
            },
            rules: {
              ...gatsbyEslintConfig.rules,
              'react-hooks/exhaustive-deps': 'off',
              'jsx-a11y/no-autofocus': 'off',
              '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
              'no-console': [
                RUNTIME_ENVIRONMENT === allRuntimeEnvironments.RELEASE ? 'error' : 'warn',
                { allow: ['warn', 'error'] },
              ],
            },
          },
        },
      ],
    },
  });
};

exports.onPreBuild = async ({ store }) => {
  try {
    await saveGraphQLSchemaToFile(store);

    const GRAPHQL_TYPESCRIPT_GENERATOR_COMMAND =
      path.resolve(__dirname, 'node_modules', '.bin', 'graphql-codegen') + ' --config codegen.yml';

    await exec(GRAPHQL_TYPESCRIPT_GENERATOR_COMMAND);

    /*
        TODO: run grep commands concurrently
      */

    //
    //
    const hardcodedConfigImports = await exec(
      'grep -r "__config." ./src ./type-declarations ./__config.* gatsby-browser.* gatsby-config.* gatsby-ssr.* bootstrap-build-environment.* || true',
      {
        shell: true,
      }
    );

    if (hardcodedConfigImports.stdout.trim()) {
      throw new Error(
        `Hardcoded configuration imports were found. Use the "@config" alias instead to import configuration files:\n${hardcodedConfigImports.stdout}`
      );
    } else if (hardcodedConfigImports.stderr.trim()) {
      throw new Error(hardcodedConfigImports.stderr);
    }
    //
    //

    //
    //
    const usageOfWrongQueryStringPackage = await exec(
      `grep -r "from 'querystring'\\|from \\"querystring\\"" ./src ./type-declarations ./__config.* gatsby-browser.* gatsby-config.* gatsby-ssr.* bootstrap-build-environment.* || true`,
      {
        shell: true,
      }
    );

    if (usageOfWrongQueryStringPackage.stdout.trim()) {
      throw new Error(
        `The package meant to do query string operations is called "query-string" but an import to "querystring" was found:\n${usageOfWrongQueryStringPackage.stdout}`
      );
    } else if (usageOfWrongQueryStringPackage.stderr.trim()) {
      throw new Error(usageOfWrongQueryStringPackage.stderr);
    }
    //
    //

    const TYPESCRIPT_TYPE_CHECK_COMMAND =
      path.resolve(__dirname, 'node_modules', '.bin', 'tsc') + ' --p tsconfig.release.json';

    await exec(TYPESCRIPT_TYPE_CHECK_COMMAND);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

exports.onCreateDevServer = async ({ store }) => {
  try {
    const { spawn } = childProcess;

    await saveGraphQLSchemaToFile(store);

    /*
      GRAPHQL Typescript types generator
    */
    const GRAPHQL_TYPESCRIPT_GENERATOR_COMMAND =
      path.resolve(__dirname, 'node_modules', '.bin', 'graphql-codegen') + ' --config codegen.yml';

    const graphqlTypescriptGeneratorWatcherProcess = spawn(GRAPHQL_TYPESCRIPT_GENERATOR_COMMAND + ' --watch', {
      shell: true,
    });

    graphqlTypescriptGeneratorWatcherProcess.stdout.on('data', function (data) {
      console.info('stdout: ' + data.toString());
    });

    graphqlTypescriptGeneratorWatcherProcess.stderr.on('data', function (data) {
      console.error('stderr: ' + data.toString());
    });

    graphqlTypescriptGeneratorWatcherProcess.on('exit', function (code) {
      if (code !== 0) {
        console.error(GRAPHQL_TYPESCRIPT_GENERATOR_COMMAND + ' exited with code ' + code);
        process.exit(1);
      } else {
        console.info(GRAPHQL_TYPESCRIPT_GENERATOR_COMMAND + ' exited correctly.');
      }
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
