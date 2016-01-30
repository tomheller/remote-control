var gulp = require('gulp');
var spawn = require('child_process').spawn;
var readline = require('readline');
var buildParams = ['run', 'nodemon', './bin/www'];


var log = function(data) {
  console.log('' + data);
};

var errors = 0;

var err = function(data) {
  console.error('' + data);
  errors++;
};


var nodemonTask = function(options, done) {
  var nodemonCommand = process.platform === "win32" ? "npm.bat" : "npm";
  var nodemon = spawn(nodemonCommand, options);

  var rlErr = readline.createInterface({
    input: nodemon.stderr
  });

  var rlOut = readline.createInterface({
    input: nodemon.stdout
  });

  rlErr.on('line', function(line) {
    if(line.indexOf('warning') >= 0 || line.indexOf('Warning') >= 0) {
      console.log(line);
    } else {
      err(line);
    }
  });

  rlErr.on('close', function() {
    if(errors) {
      throw new Error('Error on build');
    }
  });

  rlOut.on('line', log);

  done();
};

gulp.task('nodemon', function(done) {
  nodemonTask(buildParams, done);
});
