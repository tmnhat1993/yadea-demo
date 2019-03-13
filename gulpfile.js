var gulp = require('gulp');
var webpack = require('webpack');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


gulp.task('sass',function(){
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .on('error', swallowError)
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});

gulp.task('watch', function() {
  browserSync.init({
    server:{
      baseDir: 'app/'
    },
  });

  gulp.watch(['app/js/modules/*.js', 'app/js/scripts.js'], ['waitForScripts']);
  gulp.watch('app/*.html',browserSync.reload);
  gulp.watch('app/*/*.html',browserSync.reload);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/css/**/*.css',browserSync.reload);
});

gulp.task('waitForScripts', ['scripts'], function() {
  browserSync.reload();
});

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}