const mix = require('laravel-mix');
const path = require('path');
require('laravel-mix-polyfill');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .polyfill({
        enabled: true,
        useBuiltIns: "entry",
        targets: "firefox 50, IE 11"
    });;

mix.webpackConfig({
    resolve: {
        alias: {
            '@uf': path.resolve(__dirname, 'resources/js/ReactApp/src')
        }
    },
    // devServer: {
    //     proxy: {
    //         '*': 'http://localhost:8000'
    //     }
    // }
});
