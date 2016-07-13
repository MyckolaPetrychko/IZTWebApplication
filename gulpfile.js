"use strict";
const gulp = require('gulp');
const del = require('del');

const typescript = require('gulp-typescript');
const tsConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const tsLintConfig = require('./tslint.json');

const liteServer = require('lite-server');

const sass = require('gulp-sass');
// const sassLint = require('gulp-sass-lint');
const minifyCss = require('gulp-clean-css');

const uglify = require('gulp-uglify');
const jsdoc3 = require('gulp-jsdoc3');

const concat = require('gulp-concat');
const rename = require('gulp-rename');
// const notify = require('gulp-notify');

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache    = require('gulp-cache');


// clean the contents of the distribution directory
gulp.task('clean', function() {
    return del('build/');
});
gulp.task('clean-realese', function() {
    return del('realese/');
});

// linting
gulp.task('tslint', function() {
    return gulp.src('src/**/*.ts')
        .pipe(tslint(tsLintConfig))
        .pipe(tslint.report('verbose'));
});

// gulp.task('sasslint', function() {
//     // gulp.src(config.src.css)
//     gulp.src('src/css/*.s+(a|c)ss')
//         .pipe(sassLint().on('error', function(error) { console.error(error); }));
//     // .pipe(sassLint.format())
//     // .pipe(sassLint.failOnError());
// });

// gulp.task('lint', ['tslint', 'sasslint']);
gulp.task('lint', ['tslint']);


// copy image
gulp.task('image',[], function() {
    return gulp.src('src/accets/img/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()],
        }))
        .pipe(gulp.dest('build/accets/img/'));
});

// copy css
gulp.task('css', [], function() {
    return gulp.src('src/**/*.s+(a|c)ss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded', includePaths: ['src/*'] })
        .on('error', function(error)
        {
            sass.logError(error);
            this.emit('end');
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'));//.on('end', done);
});

// copy css
gulp.task('css-realese', [], function() {
    return gulp.src('build/**/*.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCss())
        .pipe(gulp.dest('realese/'));
});


// TypeScript compile
gulp.task('ts', function() {
    return gulp.src(['src/**/*.ts', 'typings/index.d.ts', '!src/node_modules/'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'));
});

//copy js: libs
gulp.task('js', function() {
    return gulp.src('src/**/*.js')
          .pipe(gulp.dest('build/'));
});

//copy js: libs
gulp.task('js-realese', function() {
    return gulp.src('build/**/*.js')
          .pipe(rename({ suffix: '.min' }))
          .pipe(uglify())
          .pipe(gulp.dest('realese/'));
});

gulp.task('lib', function() {
    // TODO: GULPFILE | clean angular only need
    let res1 = gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/normalize.css/normalize.css',
        'node_modules/ng2-translate/bundles/ng2-translate.js'
     //   'node_modules/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(gulp.dest('./build/node_modules'));
    let res2 =  gulp.src([
     //   'node_modules/primeng/**/*.js',
        'node_modules/rxjs/**/*js',
        'node_modules/@angular/**/*.umd.js',
        'node_modules/font-awesome/fonts/*',
        'node_modules/font-awesome/css/font-awesome.css',
      //  'node_modules/ng2-bootstrap/**/*.js',
        'node_modules/@angular/core/src/facade/lang.js',
        'node_modules/ag-grid/**/*',
        'node_modules/ag-grid-ng2/**/*'
        ],
         {base: "./node_modules"})
    .pipe(gulp.dest('./build/node_modules'));

    return (res1 && res2);
        
});

// copy static assets
gulp.task('assets', [], function() {
    return gulp.src(['src/assets/**', '!src/accets/img/*'])
        .pipe(gulp.dest('build/assets/'));
});

// copy static assets
// gulp.task('fonts', [], function() {
//     return gulp.src(['src/fonts/*'])
//         .pipe(gulp.dest('build/fonts/'));
// });

// gulp.task('testData', [], function() {
//     return gulp.src(['src/data_test/*.json'])
//         .pipe(gulp.dest('build/data_test/'));
// });

// copy static assets
gulp.task('html', [], function() {
    return gulp.src(['src/**/*.html'])
        .pipe(gulp.dest('build/'));
});
// copy static assets
gulp.task('html-realese', [], function() {
    return gulp.src(['build/**/*.html'])
        .pipe(gulp.dest('realese/'));
});


gulp.task('build', ['lib', 'js', 'ts', 'css', 'image', 'html', 'assets']);
gulp.task('realese', ['lib', 'js-realese', 'css-realese', 'image', 'html-realese', 'assets']);

gulp.task('ts:w', function() {
    gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('build:w', ['build'], function() {
    gulp.watch('src/**/*.ts', ['ts']);
    gulp.watch('src/**/*.scss', ['css']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/assets/*', ['assets']);

});
gulp.task('default', ['build']);
