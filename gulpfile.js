var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  webpack = require('webpack-stream'),
  $ = require('gulp-load-plugins')();

gulp.task('js', function () {
  return gulp.src(['src/*.js'])
    .pipe($.plumber())
    .pipe($.babel(
      {presets: ['es2015']}
    ))
    // .pipe($.uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', function(){
  return gulp.src(['src/*.scss'])
    .pipe($.plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack', ['js'], function() {
  return gulp.src(['./dist/pf-alert.component.js'])
    .pipe(webpack())
    .pipe($.rename('pf-alert.component.webpack.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['scss', 'js', 'webpack']);

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('index.html', ['build']);
  gulp.watch('src/*.js', ['build']);
  gulp.watch('src/*.scss', ['build']);
  gulp.watch("dist/**/*").on('change', browserSync.reload);
});
