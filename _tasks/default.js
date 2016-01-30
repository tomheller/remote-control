var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', ['scripts', 'styles']);

gulp.task('build', function(done) {
  runSequence(['scripts', 'styles'], done);
});

gulp.task('dev', ['copy-components', 'scripts:watch', 'styles:watch', 'nodemon']);

gulp.task('test', ['scripts:lint', 'styles:lint']);
