var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var glob = require('glob');

gulp.task("default", function () {
    var files = glob.sync('*.ts');
    return browserify({
        basedir: '.',
        debug: true,
        entries: files,
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("."));
});
