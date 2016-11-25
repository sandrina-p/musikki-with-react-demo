var gulp = require('gulp'),

    //general plugins
    rename = require('gulp-rename'),
    argv = require('yargs').argv, // flags to command-line
    gulpif = require('gulp-if'), // execute some task conditions (ex dev vs prod)
    gutil = require('gulp-util'), // better error logs like pump
    changed = require('gulp-changed'), // only compiles what was changed
    cached = require('gulp-cached'),
    stripDebug = require('gulp-strip-debug'), //bye bye console.logs
    chalk = require('chalk'), //some color on terminal

    browserSync = require('browser-sync'),

    //scss stuff
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sassInheritance = require('gulp-sass-multi-inheritance'), // watch partials

    //javascript plugins
    uglify = require('gulp-uglify'),
    include = require("gulp-include"), //append js
    babel = require('gulp-babel'); // ES2015 rocks


var folderScripts = 'assets/scripts',
    folderStyles = 'assets/styles',
    srcScss = [ folderStyles+'/**/*.scss', '!'+folderStyles+'/**/_*.scss'];


function logEnv() {
    var chWarn = chalk.bold.red,
        chGood = chalk.bold.green,
        envv = argv.production ? chGood('production') : chWarn('development');
    console.log('environment: ' + envv);
}

// ------------ tasks ------------- //

gulp.task('scripts', function(){
    console.log('start task scripts');
    gulp.src([
            folderScripts+'/**/*.js',
            '!'+folderScripts+'/**/_*.js',
            '!'+folderScripts+'/**/*.min.js'
        ])
        .pipe(include())
        .pipe(babel({
            presets: ["react"]
        }))

        .pipe(gulpif(argv.production, stripDebug()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(global.isWatching, cached('cachedPlace')))
        .pipe(gulp.dest( function(file) { return file.base; } ));
    logEnv();
});


// sass, rename .min, autoprefixer, cleanCSS minimize
gulp.task('scss', function(){
    console.log('start task scss');
    gulp.src(srcScss)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 6', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: true
        }))
        .pipe(gulpif(argv.production,
            cleanCSS({
                compatibility: 'ie9'
            })
        ))
        .pipe(gulpif(argv.development,
            cleanCSS({
                compatibility: 'ie9',
                advanced: false //much faster
            })
        ))
        .pipe(gulpif(global.isWatching, cached('cachedPlace')))
        .pipe(gulp.dest(folderStyles))
        .pipe(browserSync.stream());
    logEnv();
});


// watch for partials when they are changed to change their parent.
gulp.task('scssPartials', function() {
    return gulp.src('assets/**/*.scss')
        .pipe(gulpif(global.isWatching, cached(srcScss))) //filter out unchanged scss files, only works when watching
        .pipe(sassInheritance({dir: 'assets'}).on('error', gutil.log)); //find files that depend on the files that have changed
});

gulp.task('min-all', ['scripts', 'scss'] );


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        open: false,
        ghostMode: false
    });

    gulp.watch(folderStyles+"/**/*.scss", ['scss']);
    gulp.watch(["*.html"]).on('change', browserSync.reload);
});


gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('watch', ['setWatch', 'scssPartials', 'browser-sync'], function(){
    gulp.watch([
            folderScripts+'/**/*.js',
            '!'+folderScripts+'/**/*.min.js'
        ], { usePolling: true }, ['scripts']);
    gulp.watch(['**/*.php'], ['gen-html']);
});

gulp.task('tasks', function(){
        var chTitle = chalk.bold.blue;
        var chBold = chalk.bold;
        console.log(chBold('Gulp tasks available')+"\n"
            +chTitle('$ gulp watch')+"\n"
            	+"     watch .js (!*.min.js, !_*.js) modifications on assets/scripts and apply scripts task.  Use '--production' to also minify them.\n"
                +"     watch .scss (!_*.scss) modifications on assets/styles and apply styles task. \n"
                +"     also executes gulp gen-html \n"

            +"\n"+chTitle('$ gulp scripts')+"\n"
            	+"     create .min of all .js (!*.min.js, !_*.js) on assets/scripts \n"
            	+"     Use '--production' to also minify and delete console_logs \n"

            +"\n"+chTitle('$ gulp styles')+"\n"
            	+"     compile and minify all scss (!_*.scss) on assets/styles to .min.css \n"

            +"\n"+chTitle('$ gulp min-all')+"\n"
            	+"     run scripts and styles tasks. use '--production' to also minify them.\n"

        );
});

gulp.task('default', function() {
        console.log('hello person. type "gulp tasks" to know what tasks are available');
});
