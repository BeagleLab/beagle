/*jshint strict:false */

// var buffer = require('vinyl-buffer')
// var fs = require('fs')
// var react = require('gulp-react')
var browserify = require('browserify')
var concat = require('gulp-concat')
var connect = require('gulp-connect')
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')
var del = require('del')
var gulp = require('gulp')
var gutil = require('gulp-util')
var imagemin = require('gulp-imagemin')
var reactify = require('reactify')
var source = require('vinyl-source-stream')
var sourcemaps = require('gulp-sourcemaps')
var watchify = require('watchify')
var argv = require('minimist')(process.argv.slice(2))

// TODO Export style automatically
// var style = require('beagle-style')

var paths = {
  'build': 'build/',
  'main': 'main',
  'background': 'background',
  'jsPath': './js/',
  'js': ['js/**/*.js', 'js/**/*.jsx', '!js/milestones/**/*'],
  'img': ['static/images/**/*'],
  'milestones': ['js/milestones/**/*.*'],
  'static': [
    'static/**/*.css',
    'static/**/*.js',
    'static/**/*.json',
    '!static/manifest.json',
    '!static/pdfjs/**/*.*',
    'node_modules/beagle-style/style.min.css'
  ],
  'css': ['css/**/*.css'],
  'html': ['static/html/**/*.html'],
  'manifest': ['static/manifest.json'],
  'pdfjs': ['static/pdfjs/**/*']
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
    'entries': [paths.jsPath + (argv.path === 'background' ? paths.background : paths.main) + '.js'],
    'noParse': ['react.js', 'jquery.js', 'pdf.combined.js'],
    'transform': [reactify]
  })
  .transform('brfs', { global: true })

// For one-off bundling. browserify bundle - brundle is a joke.
gulp.task('brundle', function () {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(
      argv.path === 'background' ? paths.background + '.min.js' : paths.main + '.min.js'
    ))
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
    // .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(
      argv.path === 'background' ? paths.background + '.min.js' : paths.main + '.min.js'
    ))
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

gulp.task('manifest', function () {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest('build'))
})

gulp.task('pdfjs', function () {
  return gulp.src(paths['pdfjs'], { base: './static/pdfjs/'})
    .pipe(gulp.dest('build/pdfjs'))
})

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    // .pipe(concat('beagle.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'))
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
  gulp.watch(paths.css, ['static'])
  gulp.watch(paths.manifest, ['manifest'])
  gulp.watch(paths.img, ['img'])
  gulp.watch(paths.html, ['html'])
})

gulp.task('bundle', [
  'brundle',
  'static',
  'manifest',
  'css',
  'img',
  'html',
  'pdfjs'
  ], function () {
  this.stop()
})

gulp.task('default', [
  'watch',
  'watchify',
  'static',
  'manifest',
  'css',
  'img',
  'html',
  'server'
])
