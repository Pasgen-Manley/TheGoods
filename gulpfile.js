const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('start', function (done) {
    nodemon({
      script: 'server.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': process.env.NODE_ENV || 'development' }
    , done: done
    })
  })