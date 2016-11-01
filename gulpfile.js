var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  webpack = require('webpack-stream'),
  $ = require('gulp-load-plugins')();

gulp.task('js', ['lint'], function () {
  return gulp.src(['src/*.js'])
    .pipe($.plumber())
    .pipe($.babel(
      {presets: ['es2015']}
    ))
    // .pipe($.uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
  return gulp.src(['src/*.js'])
    .pipe(eslint('eslint.json'))
    .pipe(eslint.failOnError());
});

gulp.task('webpack', ['js'], function() {
  return gulp.src(['./dist/patternfly-utils.js'])
    .pipe(webpack())
    .pipe($.rename('patternfly-utils.webpack.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['js', 'webpack']);
