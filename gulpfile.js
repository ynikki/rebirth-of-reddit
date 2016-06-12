var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function (){
  gulp
  .src('scss/styles.scss')
  .pipe(sass())
  .pipe(gulp.dest('css'));
});

gulp.task('watch', function (){
  gulp.watch('js/app.js', function (){
    console.log('The file changed.');
  });
});

gulp.task('default', function (){
  // .task are useful, they automate task.
  console.log('hello again');
});

