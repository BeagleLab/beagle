/*jshint strict:false */

// var fs = require('fs')
// var g_if = require('gulp-if')
// var react = require('gulp-react')
// var uglify = require('gulp-uglify')
var browserify = require('browserify')
var concat = require('gulp-concat')
var connect = require('gulp-connect')
var cssmin = require('gulp-cssmin')
var del = require('del')
var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var reactify = require('reactify')
var sass = require('gulp-sass')
var source = require('vinyl-source-stream')
var sourcemaps = require('gulp-sourcemaps')

// TODO Export style automatically
// var style = require('beagle-style')

var paths = {
  "build": 'build/',
  "main": ['./js/main.js', './js/background.js'],
  "js": ['js/**/*.js', 'js/**/*.jsx'],
  "img": ['static/**/*.png', 'static/**/*.jpg', '!static/content/**'],
  "static": [
    'static/**/*.css',
    'static/**/*.js',
    '!static/content/**/*.*',
    '../beagle-style/style.min.css',
    'examples/example.pdf'
  ],
  "sass": ['scss/**/main.scss'],
  "iframeSass": ['scss/**/iframe.scss'],
  "html": ['html/**/*.html'],
  "manifest": ['static/manifest.json'],
  "content": ['static/content/**/*']
}

gulp.task('clean', function(cb) {
  del([paths.build], cb)
})

gulp.task('browserify', function() {
  return browserify(paths.main)
    .transform(reactify)
    .transform({global: true }, 'brfs')
    .plugin('factor-bundle', {outputs: ['build/main.min.js', 'build/background.min.js']})
    .bundle()
    .pipe(source('common.min.js'))
    // .pipe(sourcemaps.init())
    // .pipe(g_if('*.jsx', react()))
    // .pipe(uglify())
    // .pipe(concat('bundle.min.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
})

gulp.task('static', function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest('build/static/'))
})

gulp.task('move', function() {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest('build'))
})

gulp.task('content', function() {
  return gulp.src(paths["content"], { base: './static/content/'})
    .pipe(gulp.dest('build/content'))
})

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cssmin())
      .pipe(concat('bundle.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
})

gulp.task('iframeSass', function() {
  return gulp.src(paths.iframeSass)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cssmin())
      .pipe(concat('iframe.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
})

gulp.task('img', function() {
  return gulp.src(paths.img)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/images/'))
    // .pipe(connect.reload())
})

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('build/'))
})

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
  gulp.watch(paths.manifest, ['static'])
  gulp.watch(paths.js, ['browserify'])
  gulp.watch(paths.css, ['static'])
  gulp.watch(paths.sass, ['sass'])
  gulp.watch(paths.iframeSass, ['iframeSass'])
  gulp.watch(paths.img, ['img'])
  gulp.watch(paths.html, ['html'])
})

gulp.task('bundle', ['move', 'static', 'sass', 'iframeSass', 'browserify', 'img', 'html', 'content'])
gulp.task('default', ['watch', 'move', 'static', 'sass', 'iframeSass', 'browserify', 'img', 'html', 'server'])
