var gulp = require('gulp');

var buildSource = [
  '**/*',
  '!node_modules',
  '!node_modules/**/*',
  '!_js',
  '!_js/**',
  '!_scss',
  '!_scss/**',
  '!_tasks',
  '!_tasks/**',
  '!build',
  '!build/**',
  '!gulpfile',
  '!LICENSE',
  '!nodemon.json',
  '!Readme.md'
];

gulp.task('bundle', function() {
  gulp.src(buildSource)
    .pipe(gulp.dest('./build/'));
});
