import gulp from 'gulp';
import mocha from 'gulp-mocha';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import cache from 'gulp-cached';
import istanbul from 'gulp-istanbul';
import streamify from 'gulp-streamify';

const jsPaths = ['client/**/*.js', 'server/**/*.js'];

gulp.task('test', () => {
    return gulp.src(jsPaths, { read: false })
        .pipe(plumber())
        .pipe(streamify(istanbul()))
        .pipe(streamify(istanbul.hookRequire()))
        .pipe(runTests());

    function runTests() {
        return gulp.src('tests/**/*.test.js')
            .pipe(streamify(mocha({ reporter: 'nyan' })))
            .pipe(streamify(istanbul.writeReports()))
            .pipe(streamify(istanbul.enforceThresholds({ thresholds: { global: 80 } })));
    }
});

gulp.task('lint', function () {
    return gulp.src(jsPaths)
        .pipe(plumber())
        .pipe(cache('linting'))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
