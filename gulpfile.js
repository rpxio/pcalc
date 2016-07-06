var gulp = require('gulp');

// require plugins
var del = require('del');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// clean task
gulp.task('clean', function() {
    return del([
        './dist/**/*'
    ]);
});

// copy task
gulp.task('copy', function() {
    return gulp
        .src('./src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// sass task
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// browsersync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});
  
// watch task
gulp.task('watch', ['browserSync', 'sass', 'copy'], function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['copy']);
    gulp.watch('./src/js/**/*.js', browserSync.reload);
});

// default task
gulp.task('default', ['watch']);
