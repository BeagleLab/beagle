var gulp = require('gulp');
var g_if = require('gulp-if');
var react = require('gulp-react');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
// var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var del = require('del');
var fs = require('fs');

var paths = {
  build: 'build/',
  main: ['./js/main.js'],
  js: ['js/**/*.js', 'js/**/*.jsx'],
  img: ['static/**/*.png'],
  css: ['scss/**/*.scss'],
  html: ['html/**/*.html'],
};

gulp.task('clean', function(cb) {
  del([paths.build], cb);
});

gulp.task('js', function() {
  return browserify(paths.main)
    .transform({global: true }, 'reactify')
    .transform({global: true }, 'brfs')
    .bundle()
    .pipe(source('bundle.min.js'))
    // .pipe(sourcemaps.init())
    // .pipe(g_if('*.jsx', react()))
    // .pipe(uglify())
    // .pipe(concat('bundle.min.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cssmin())
      .pipe(concat('bundle.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('img', function() {
  return gulp.src(paths.img)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/images/'));
    // .pipe(connect.reload())
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.img, ['img']);
  gulp.watch(paths.html, ['html']);
});


gulp.task('default', ['watch', 'css', 'js', 'img', 'html']);
