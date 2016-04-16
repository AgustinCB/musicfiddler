var gulp = require('gulp')
var sass = require('gulp-sass')
var prefix = require('gulp-autoprefixer')
var browserify = require('gulp-browserify')

var styles = 'src/sass/*.scss'
var scripts = [ 'src/js/*.js', 'src/vendors/*.js', 'src/components/*.js', 'src/tools/*.js' ]

gulp.task('styles', function () {
  return gulp.src(styles)
    .pipe(sass())
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'ie 7'))
    .pipe(gulp.dest('site/css'))
})

gulp.task('jsx', function () {
  return gulp.src(scripts)
    .pipe(browserify({
      insertGlobals: true,
      transform:  ['babelify'],
      debug: !gulp.env.production
    }))
    .pipe(gulp.dest('site/js'))
})

gulp.task('watch', function () {
  gulp.watch(styles, ['styles'])
  gulp.watch(scripts, ['jsx'])
})

gulp.task('default', ['watch', 'styles', 'jsx'])

gulp.task('build', ['styles', 'jsx'])
