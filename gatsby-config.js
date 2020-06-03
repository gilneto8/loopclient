const { RUNTIME_ENVIRONMENT, allRuntimeEnvironments } = require('./bootstrap-build-environment');
const { COMMON_CONFIG } = require(`@config/common-config`);
const { throwIfNotFilledString } = require('./build-values-validation');

const urlString = throwIfNotFilledString(COMMON_CONFIG.siteUrl);

module.exports = {
  siteMetadata: {
    siteUrl: (() => {
      if (
        !(
          // ACCEPTANCE CRITERIA
          (
            urlString &&
            (urlString.startsWith('https://') || urlString.startsWith('http://')) &&
            !urlString.endsWith('/')
          )
        )
      ) {
        throw new Error();
      } else {
        return urlString;
      }
    })(),
    title: `Loop`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        labelFormat: '__[filename]__[local]__',
      },
    },
    'gatsby-plugin-typescript',
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-robots-txt',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    /*
      WARNING:
      do not point a gatsby-source-filesystem instance to the root of the project,
      as it will listen for file changes in Gatsby internal directories like .cache
      and will start looping.
    */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    ...(() => {
      if (RUNTIME_ENVIRONMENT === allRuntimeEnvironments.RELEASE) {
        return [
          {
            resolve: 'gatsby-plugin-webpack-bundle-analyzer',
            options: {
              analyzerMode: 'disabled',
              generateStatsFile: true,
              production: true,
              statsFilename: 'webpack-bundle-analyzer-stats.json',
            },
          },
        ];
      } else {
        return [];
      }
    })(),
  ],
};
