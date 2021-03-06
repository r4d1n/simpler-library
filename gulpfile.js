var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

var mocha = require('gulp-mocha');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('client-js', function() {
  return gulp.src('lib/client.js')
  //.pipe(jshint())
  //.pipe(jshint.reporter('default'))
  .pipe(gulp.dest('public/javascripts'))
  .pipe(rename('client.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts'))
});

gulp.task('less-css', function() {
  return gulp.src('lib/less/main.less')
  .pipe(less({
    plugins: [autoprefix, cleancss]
  }))
  .pipe(gulp.dest('./public/stylesheets'))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('test-server', function() {
  return gulp.src('test/server/*.js')
  .pipe(mocha({ui: 'tdd'}));
})

gulp.task('test-client', function() {
  return gulp.src('test/client/test.html')
  .pipe(mochaPhantomJS());
})


gulp.task('default', ['client-js', 'less-css', 'test-server', 'test-client']);

