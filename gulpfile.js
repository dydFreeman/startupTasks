var gulp = require('gulp'),
  bump = require('gulp-bump'),
  git = require('gulp-git'),
  inject = require('gulp-inject-string'),
  merge = require('merge-stream'),
  tag_version = require('gulp-tag-version'),
  tslint = require('gulp-tslint'),
  typings = require('gulp-typings'),
  shell = require('gulp-shell');

var paths = {
  src_ts: 'src/**/*.ts',
  tests_ts: 'test/**/*.ts',
};

function versionBump(semver) {
  return gulp
    .src(['./package.json'])
    .pipe(bump({ type: semver }))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bump package version'))
    .pipe(tag_version());
}

gulp.task('compile', shell.task(['npm run vscode:prepublish']));

gulp.task('major', ['compile'], function() {
  return versionBump('major');
});

gulp.task('minor', ['compile'], function() {
  return versionBump('minor');
});

gulp.task('patch', ['compile'], function() {
  return versionBump('patch');
});