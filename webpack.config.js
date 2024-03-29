const Encore = require('@symfony/webpack-encore');
// const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require("path");
const Dotenv = require('dotenv-webpack');
// const CopyPlugin = require('copy-webpack-plugin');

// dotenv.config({ path: '.env.local' });

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or subdirectory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('@app', './assets/app.ts')
    .addEntry('@auth', './assets/js/auth.ts')
    .addEntry('@contact', './assets/js/contact.ts')
    .addEntry('@home', './assets/js/home.ts')
    .addEntry('@ads', './assets/js/ads.ts')
    .addEntry('@cms', './assets/js/cms.ts')

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    // .addPlugin(
    //     new webpack.DefinePlugin({
    //         'process.env.ADMIN_URL': JSON.stringify(process.env.ADMIN_URL),
    //         'process.env.X_AUTH_TOKEN': JSON.stringify(process.env.X_AUTH_TOKEN),
    //         'process.env.X_AUTH_IDENTIFIER': JSON.stringify(process.env.X_AUTH_IDENTIFIER),
    //     }),
    // )

    // Set the path the files are copied to
    // .copyFiles({
    //     from: './assets/img',
    //     pattern: /\.(png|jpg|jpeg|webp|gif)$/,
    //     // to path is relative to the build directory
    //     to: 'img/[path][name].[ext]'
    // })

    // with pnpm you must use this copy system for froala-editor
    // .addPlugin(
    //     new CopyPlugin({
    //         patterns: [{
    //             from: './assets/img/',
    //             to: 'img/[path][name][ext]',
    //         }],
    //     })
    // )

    .addPlugin(new Dotenv({ path: './.env.local', systemvars: true }))

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    .enableTypeScriptLoader()

    // uncomment if you use React
    .enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    .enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
    ;

let config = Encore.getWebpackConfig();

config.resolve.alias["@@js"] = path.resolve(__dirname, "assets/js"); // To access assets/js => @@js
config.resolve.alias["@@css"] = path.resolve(__dirname, "assets/css"); // To access assets/css => @@css
config.resolve.alias["@@public"] = path.resolve(__dirname, "public"); // To access public => @@public
config.resolve.alias["@@vendor"] = path.resolve(__dirname, "vendor"); // To access public => @@vendor
config.resolve.alias["@@assets"] = path.resolve(__dirname, "assets"); // To access public => @@assets

module.exports = config;
