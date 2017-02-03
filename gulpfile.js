/**
  To add more typings: C:\>typings install
  otherwise run gulp and then load the startup html
*/
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var glob = require('glob');
const b = require('gulp-browserify-typescript');
var files = [];
// adding vanilla jquery to the files didn't work
// adding jquery-browserify works
//files.push("node_modules/jquery-browserify/lib/jquery.js");
files.push("node_modules/jquery/dist/jquery.min.js");
files.push("node_modules/bootstrap/dist/js/bootstrap.min.js");
files = files.concat(glob.sync('*.ts'));

var outputFile = 'bundle.js';
var outputPath = "js";
var webserver = require('gulp-webserver');
var exec = require('child_process').exec;



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

gulp.task('deploy', function (cb) {
  exec("echo Y | deployGloud.bat", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
