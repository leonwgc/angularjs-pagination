var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var concat = require('gulp-concat');
var src = 'src/';

var paths = {
  js: 'src/*.js',
  css: 'src/*.css'
};

var destPaths = {
  js: 'dist',
  css: 'dist'
};

var testPaths = {
  lib: 'demo/lib'
};


gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destPaths.css))
    .pipe(gulp.dest(testPaths.lib));
});

gulp.task('uglify-js', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destPaths.js))
    .pipe(gulp.dest(testPaths.lib));
});

gulp.task('clean', function() {
  del(['dist/', 'demo/lib']);
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['uglify-js']);
  gulp.watch(paths.css, ['minify-css']);
});

gulp.task('default', ['clean', 'watch'], function() {
  gulp.start('minify-css', 'uglify-js');
});
