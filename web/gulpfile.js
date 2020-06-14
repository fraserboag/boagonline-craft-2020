var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

gulp.task('process-css', function(){
    return gulp.src('assets/src/sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/dist/css'));
});

gulp.task('process-js', function(){
    return gulp.src('assets/src/js/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist/js'));
});

gulp.task('default', function(){
    gulp.watch('assets/src/sass/*.sass', gulp.series('process-css'));
    gulp.watch('assets/src/sass/partials/*.sass', gulp.series('process-css'));
    gulp.watch('assets/src/js/*.js', gulp.series('process-js'));
});