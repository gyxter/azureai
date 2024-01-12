const { series, src, dest, watch } = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass')(require('sass'));
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const header = require('gulp-header');
const es = require('event-stream');
const minify = require('gulp-minify');

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
        .pipe(dest('./'));
}
const watcher=()=> {
    watch('./sass/**/*.scss', { events: 'change' }, ()=>{
            sassCompile;
            console.log(
                'File ' + evt.path.replace(/.*(?=sass)/, '') + ' was ' + evt.type + ', compiling...'
            );
        });
};

exports.default = series(serve,sassCompile, watcher);