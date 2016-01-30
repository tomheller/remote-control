var gulp = require('gulp');

gulp.task('copy-components', function() {
  return gulp.src('./node_modules/ook-editor/dist/**.*')
    .pipe(gulp.dest('public'))
});
