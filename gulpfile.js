/**
 * Created by ekatebi on 12/29/14.
 */

var gulp = require('gulp');
var less = require('gulp-less');
var debug = require('gulp-debug');
var jade = require('gulp-jade');
var open = require('gulp-open');
var wait = require('gulp-wait');
var express = require('gulp-express');
var jshint = require('gulp-jshint');
var html2jade = require('gulp-html2jade');

//gulp.task('default', function() {
    // place code for your default task here
//});

// Default task
//gulp.task('default', ['jshint','express','less','watch']);
gulp.task('default', ['express']);

gulp.task('jshint', function() {
    gulp.src(['public/js/*.js','routes/*.js','app.js','bin/www'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

// Less
gulp.task('less', function() {
    gulp.src('public/stylesheets/*.less')
        //.pipe(debug({verbose:!true}))
        .pipe(less())
        .pipe(gulp.dest('public/stylesheets'));
});

// Compile jade templates
gulp.task('jade', function() {
    gulp.src('public/tmpls/jade/*.jade')
        .pipe(jade({pretty:1}))
        .pipe(gulp.dest('public/tmpls/html'));
});

gulp.task('html2jade', function() {
    gulp.src('public/tmpls-test/html/*.html')
        .pipe(debug())
        .pipe(html2jade({bodyless:true}))
        .pipe(gulp.dest('public/tmpls-test/jade'));
});

// Restart Express Server
gulp.task('express', ['jshint', 'less', 'jade'],function() {
    express.run({file:'bin/www'});
    gulp.src('/dev/null')
        .pipe(debug({verbose:!true}))
        .pipe(wait(500))
//        .pipe(open('', {url:'http://localhost:3000', app:'firefox'}));
        .pipe(open('', {url:'http://localhost:3000', app:'google-chrome'}));
});

