var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css/orig/'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./css/'));
});

gulp.task('default', function() {
  browserSync.init({
    server: './'
  });
  
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch("*.html").on('change', browserSync.reload);
});
