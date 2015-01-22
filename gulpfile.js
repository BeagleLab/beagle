var gulp = require('gulp');
var g_if = require('gulp-if');
var react = require('gulp-react');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var del = require('del');
var fs = require('fs');
/*jshint strict:false */


// TODO Export style automatically
// var style = require('beagle-style')

var paths = {
  build: 'build/',
  main: ['./js/main.js'],
  js: ['js/**/*.js', 'js/**/*.jsx'],
  img: ['static/**/*.png', 'static/**/*.jpg'],
  static: ['static/**/*.css', 'static/**/*.js', '../beagle-style/style.min.css', 'examples/example.pdf'],
  sass: ['scss/**/main.scss'],
  documentSass: ['scss/**/document-level.scss'],
  html: ['html/**/*.html'],
};

gulp.task('clean', function(cb) {
  del([paths.build], cb);
});

gulp.task('js', function() {
  return browserify(paths.main)
    .transform(reactify)
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

gulp.task('static', function() {
	return gulp.src(paths.static)
		.pipe(gulp.dest('build/static/'));
})

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cssmin())
      .pipe(concat('bundle.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('documentSass', function() {
  return gulp.src(paths.documentSass)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cssmin())
      .pipe(concat('document.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
})

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

// Here for allviews and milestones
gulp.task('server', function() {
  connect.server({
    root: 'build',
    fallback: 'build/index.html',
    port: 8000,
    livereload: true
  })
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['static']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.img, ['img']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('bundle', ['static', 'sass', 'documentSass', 'js', 'img', 'html'])
gulp.task('default', ['watch', 'static', 'sass', 'documentSass', 'js', 'img', 'html', 'server'])
