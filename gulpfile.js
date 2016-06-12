var gulp = require('gulp');

gulp.task('watch', function (){
  gulp.watch('js/app.js', function (){
    console.log('The file changed.');
  });
});

gulp.task('default', function (){
  // .task are useful, they automate task.
  console.log('hello again');
});

