/**
  To add more typings: C:\>typings install
  otherwise run gulp and then load index.html
*/
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var glob = require('glob');
const b = require('gulp-browserify-typescript');
var files = glob.sync('*.ts');
var outputFile = 'bundle.js';
var outputPath = ".";
var webserver = require('gulp-webserver');

gulp.task("default", function () {

    return browserify({
        basedir: '.',
        debug: true,
        entries: files,
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source(outputFile))
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', done => {
  b({
    watch: true,
    sourcemaps: true,
    src : files,
    outputPath : outputPath,
    outputFile : outputFile
  }).on('end', done);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
