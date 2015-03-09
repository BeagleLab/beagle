/*jshint strict:false */

// var buffer = require('vinyl-buffer')
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
var gutil = require('gulp-util')
var imagemin = require('gulp-imagemin')
var reactify = require('reactify')
var sass = require('gulp-sass')
var source = require('vinyl-source-stream')
var sourcemaps = require('gulp-sourcemaps')
var _ = require('lodash')
var watchify = require('watchify')

// TODO Export style automatically
// var style = require('beagle-style')

var paths = {
  'build': 'build/',
  'main': 'main.js',
  'jsPath': './js/',
  'background': 'background.js',
  'js': ['js/**/*.js', 'js/**/*.jsx', '!js/milestones/**/*'],
  'img': ['static/**/*.png', 'static/**/*.jpg', '!static/content/**'],
  'milestones': ['js/milestones/**/*.*'],
  'static': [
    'static/**/*.css',
    'static/**/*.js',
    '!static/content/**/*.*',
    '../beagle-style/style.min.css',
    'examples/example.pdf'
  ],
  'sass': ['scss/**/main.scss'],
  'iframeSass': ['scss/**/iframe.scss'],
  'html': ['html/**/*.html'],
  'manifest': ['static/manifest.json'],
  'content': ['static/content/**/*']
}

gulp.task('clean', function (cb) {
  del([paths.build], cb)
})

// Initiation of browserify object
var b = browserify({
    // Required watchify args
    'cache': {},
    'packageCache': {},
    'fullPaths': true,
    // Browserify options
    'entries': [paths.jsPath + 'main.js'],
    'noParse': ['react.js', 'jquery.js', 'pdf.combined.js'],
    'transform': [reactify]
  })
  .transform('brfs', { global: true })

// For one-off bundling. browserify bundle - brundle is a joke.
gulp.task('brundle', function() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.min.js'))
    // If you want your source maps up in your console
    // .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'))
})

// For watching after bundling
var bundler = watchify(b)

function bundle () {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.min.js'))
    // If you want your source maps up in your console
    // .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'))
}

gulp.task('watchify', bundle)
bundler.on('update', bundle)
bundler.on('log', gutil.log)

// gulp.task('milestones', function () {
//   return browserify('./js/milestones/allviews.js')
//     .transform(reactify)
//     .transform({global: true }, 'brfs')
//     .bundle()
//     .pipe(source('allviews.min.js'))
//     .pipe(gulp.dest('build/milestones/'))
// })

gulp.task('static', function () {
  return gulp.src(paths.static)
    .pipe(gulp.dest('build/static/'))
})

gulp.task('move', function () {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest('build'))
})

gulp.task('content', function () {
  return gulp.src(paths['content'], { base: './static/content/'})
    .pipe(gulp.dest('build/content'))
})

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cssmin())
      .pipe(concat('bundle.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
})

gulp.task('iframeSass', function () {
  return gulp.src(paths.iframeSass)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cssmin())
      .pipe(concat('iframe.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
})

gulp.task('img', function () {
  return gulp.src(paths.img)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/images/'))
    // .pipe(connect.reload())
})

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest('build/'))
})

// Here for allviews and milestones
gulp.task('server', function () {
  connect.server({
    root: 'build',
    fallback: 'build/index.html',
    port: 8000,
    livereload: true
  })
})

gulp.task('watch', function () {
  gulp.watch(paths.manifest, ['static'])
  // gulp.watch(paths.js, ['js'])
  // gulp.watch(paths.milestones, ['milestones'])
  gulp.watch(paths.css, ['static'])
  gulp.watch(paths.sass, ['sass'])
  gulp.watch(paths.iframeSass, ['iframeSass'])
  gulp.watch(paths.img, ['img'])
  gulp.watch(paths.html, ['html'])
})

gulp.task('bundle', ['brundle', 'move', 'static', 'sass', 'iframeSass', 'img', 'html', 'content'], function(){
  this.stop()
})

gulp.task('default', ['watch', 'watchify', 'move', 'static', 'sass', 'iframeSass', 'img', 'html', 'server'])
