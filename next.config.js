const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const compose = require('next-compose-plugins');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const withCSS = require("@zeit/next-css");
if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

const publicRuntimeConfig = {
  appName: 'cms-internal',
  devTeam: 'Power Automation Pte Ltd.',
  website: 'https://www.pa.com.sg/',
  description: 'Base Web App Project',
  themeColor: '#ffffff',
  backgroundColor: '#ffffff',
  tokenName: 'access_token',
  fullYear: new Date().getFullYear(),
  recapchaSiteKey: process.env.RECAPCHA_SITE_KEY || '',
};

const nextjsCommunityPlugins = [
  withTypescript,
  [withBundleAnalyzer, {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    }
  }]
];

const configureReactSVGImportHandling = (config) => {
  config.module.rules.push({
    test: /\.svg$/,
    use: ['svgr/webpack'],
  });
};

const configureFontImportHandling = (config) => {

  config.module.rules.push({
    test: /\.(eot|ttf|woff|woff2)$/,
    use: {
      loader: "file-loader",
      options: {
        publicPath: "/_next/static/fonts/",
        outputPath: "static/fonts/",
        name: "[hash].[ext]"
      }
    }
  });
};


const configureGlobalSCSSEntries = (config, {
  isServer,
  dev
}) => {
  const oldEntry = config.entry;

  config.entry = () => {
    return oldEntry().then((entry) => {
      entry['global.css'] = ['./static/styles/global.scss'];
      return entry;
    });
  }

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          minimize: !dev,
          sourceMap: dev,
          importLoaders: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      },
    ],
  });

  config.module.rules.push({
    test: /\.less/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'less-loader',
        options: {
          strictMath: true,
		  noIeCompat: true,
        }
      },
    ],
  });

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "static/styles/[name]"
    })
  );
};

module.exports = compose(nextjsCommunityPlugins, {
  // prevents access to raw components from /pages folder.
  // introduced to prevent access to non i18n content
  useFileSystemPublicRoutes: false,

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 20,
  },
  // whole infor of app
  publicRuntimeConfig,

  webpack(config, {
    buildId,
    dev,
    isServer,
    defaultLoaders
  }) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    configureFontImportHandling(config);
    configureReactSVGImportHandling(config);
    configureGlobalSCSSEntries(config, {
      dev,
      isServer
    });

    return config;
  },
});
