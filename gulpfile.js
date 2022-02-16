const gulp =require('gulp');
const browserSync = require('browser-sync').create();
const watch =require('gulp-watch');
const less= require('gulp-less');
const autoprifixer= require('gulp-autoprefixer');
const sourcemaps= require('gulp-sourcemaps');
const notify= require('gulp-notify');
const plumber= require('gulp-plumber');
const fileinclude= require('gulp-file-include');
const del=require('del');


//combining HTML and shablone
gulp.task('html', function(callback){
  return gulp.src('./src/html/*.html')
    .pipe( plumber({
        errorHandler: notify.onError(function(err){
          return {
            title: 'HTML include',
            sound: false,
            message: err.message
          }
        })
    }))

      .pipe( fileinclude({ prefix: '@@' }) )
      .pipe( gulp.dest('./build/'))
      .pipe(browserSync.stream())

  callback();
})

//compiling less file to css
gulp.task('less', function(callback){
  return gulp.src('./src/less/main.less')

      .pipe( plumber({
          errorHandler: notify.onError(function(err){
            return{
              title: 'Styles',
              sound: false,
              message: err.message
            }
          })
      }))

      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(autoprifixer({
        overrideBrowserslist: ['last 4 version']
      }))
      .pipe(sourcemaps.write())
      .pipe( gulp.dest('./build/css/'))
      .pipe(browserSync.stream())
    callback();
});

//tocopy from img folder
gulp.task('copy:img', function(callback){
  return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./build/imgs/'))
    callback();
});

//tocopy from js folder
gulp.task('copy:js', function(callback){
  return gulp.src('./src/js/**/*.*')
    .pipe(gulp.dest('./build/js/'))
    callback();
});




gulp.task('watch', function(){
//for watch html and reload the webpage
  //watch(['./build/*.html'], gulp.parallel(browserSync.reload));

//to reload brawoser after editing img and js
  watch([
    './build/imgs/**/*.*','./build/js/**/*.*'],
     gulp.parallel(browserSync.reload)
   );


// start to watch and compiling less  with dely, for hdd disk
  watch('./src/less/**/*.less', function (){
    setTimeout(gulp.parallel('less'),1000)
  });

  //watching the copy from src
   watch('./src/html/**/*.html',gulp.parallel('html'))
   watch('./src/img/**/*.*',gulp.parallel('copy:img'))
   watch('./src/js/**/*.*',gulp.parallel('copy:js'))

});

//task for strating from build
gulp.task('server', function(){
  browserSync.init({
    server:{
      baseDir:'./build/'
    }
  })
});

gulp.task('clean:build', function(){
  return del('./build/')
})

gulp.task(
  'default',
  gulp.series(
      gulp.parallel('clean:build'),
      gulp.parallel('less','html','copy:img','copy:js'),
      gulp.parallel('server','watch')
    ));
