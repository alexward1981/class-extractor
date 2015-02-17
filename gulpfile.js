var gulp = require('gulp'),
    browserSync = require('browser-sync');
    concat     = require('gulp-concat'),
    imagemin   = require('gulp-imagemin'),
    plumber    = require('gulp-plumber'),
    jshint     = require('gulp-jshint'),
    notify     = require('gulp-notify'),
    stripDebug = require('gulp-strip-debug'),
    uglify     = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    del = require('del');

var reload     = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });
  // Perform the site init 
  gulp.start('styles', 'scripts', 'images')

  // Compile SASS
  gulp.watch('src/sass/**/*.scss', ['styles']);

  // Compile JS
  gulp.watch('src/js/**/*.js', ['scripts']);

  // Optimise images
  gulp.watch('public/static/images/*.*', ['images']);

  gulp.watch('*.html', { cwd: 'public' }, reload);
});

gulp.task('styles', function() {
  return sass('src/sass/core.scss', { style: 'expanded' })
    .pipe(plumber())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('core.css'))
    .pipe(gulp.dest('public/static/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/static/css'))
    .pipe(reload({stream:true}))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('core.js'))
    .pipe(gulp.dest('public/static/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/static/scripts'))
    .pipe(reload({stream:true}))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Compress and minify images to reduce their file size
gulp.task('images', function() {
    var imgSrc = 'public/static/images/**/*',
        imgDst = 'public/static/images';
 
    return gulp.src(imgSrc)
        .pipe(plumber())
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
    del(['public/static/css', 'public/static/scripts', 'public/static/images'], cb)
});

gulp.task('custom', ['clean'], function() {
  gulp.start('serve');
});
