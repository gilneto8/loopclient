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
    title: `MMK Tax`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['src/components/ui-kit/global-styles/include-path'],
        cssLoaderOptions: {
          localsConvention: 'asIs',
          camelCase: false,
        },
      },
    },
    'gatsby-plugin-typescript',
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-react-helmet`,
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
    // TODO:
    //
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `MMK Tax`,
    //     short_name: `MMK Tax`,
    //     start_url: `/`,
    //     background_color: `#663399`, // TODO: change to company brand colors
    //     theme_color: `#663399`, // TODO: change to company brand colors
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // TODO: change to company logo
    //   },
    // },
    //
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
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
