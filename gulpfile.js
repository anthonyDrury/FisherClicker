var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('src/**/*.scss', { base: "./" })
        .pipe(sass())
        .pipe(gulp.dest('.'))
})

gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', gulp.series(['sass']));
})