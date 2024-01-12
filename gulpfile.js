const { series, parallel, src, dest, watch } = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass')(require('sass'));
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const header = require('gulp-header');
const es = require('event-stream');
const minify = require('gulp-minify');
const cleanCss = require("gulp-clean-css");

const serve = () => {
    src('./')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            open: true,
            port: 3001
        }));
}

const sassCompile = ()=> {
    return src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(dest('./'));
}
const watcher=()=> {
    watch('./sass/**/*.scss', sassCompile);
};
exports.default = parallel(serve, watcher)
