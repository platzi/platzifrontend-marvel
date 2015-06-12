var gulp = require('gulp')
var browserify = require('browserify')
var jadeify = require('jadeify')
var babelify = require('babelify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')

var stylus = require('gulp-stylus')
var concat = require('gulp-concat-css')
var nib = require('nib')

var minify = require('gulp-minify-css')
var uglify = require('gulp-uglify')

gulp.task('build', ['styl', 'js'])

gulp.task('js', function() {
  return browserify({
    entries: './lib/app.js', //punto de entrada js
    transform: [ babelify, jadeify] //transformaciones
  })
  .bundle()
  .pipe(source('app.js')) // archivo destino
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./public/')) // en dónde va a estar el archivo destino
})

gulp.task('styl', function() {
  return gulp.src('./lib/app.styl') // entry point de styl
    .pipe(stylus({ use: nib() })) //inicializo stylus con nib como plugin
    .pipe(concat('app.css'))
    .pipe(minify())
    .pipe(gulp.dest('./public/css'))
})