const gulp = require('gulp');

const plumber = require('gulp-plumber')
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require("gulp-imagemin");
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminJpegtran = require('imagemin-jpegtran');
const pngquant = require('imagemin-pngquant');
const run = require("run-sequence");
const del = require("del");
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const replace = require('gulp-replace');
const cssmin = require('gulp-cssmin');
const cheerio = require('gulp-cheerio');



gulp.task('serve', function(){
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  })
});
gulp.task('html', function(){
    return gulp.src('*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
    return gulp.src('css/**/*.css')
    // .pipe(sourceMaps.init())
        .pipe(cssmin())
    //     .pipe(sourceMaps.write())
        .pipe(plumber())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}));
 
});


gulp.task('js', function(){
    return gulp.src('js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
})
gulp.task('images', function(){
    return gulp.src('img/**/*.{png,jpg}')
    .pipe(imagemin([
        imageminJpegtran({progressive: true}),
        imageminJpegRecompress({
            loops: 5,
            min: 65,
            max: 70,
            quality: [0.7, 0.8]
        }),
        imagemin.optipng({optimizationLevel: 3}),
        pngquant({quality: [0.7, 0.8], speed: 5})
    ]))
    .pipe(gulp.dest('build/img'))
});


gulp.task('allimg', function(){
    return gulp.src('img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.reload({stream: true}));
});



gulp.task('svg', function () {
    return gulp.src('img/**/*.svg')
        .pipe(svgmin({
          js2svg: {
            pretty: true
          }
        }))
        // .pipe(cheerio({
        //   parserOptions: {xmlMode: true}
        // }))
        .pipe(replace('&gt;', '>'))
        // .pipe(svgSprite({
        //   mode: {
        //     symbol: {
        //       sprite: "icons-sprite.svg"
        //     }
        //   }
        // }))
        .pipe(gulp.dest('build/img'));
  });

gulp.task('watch', function(){
   gulp.watch('*.html', gulp.series('html')),
   gulp.watch("css/**/*.css", gulp.series("css"), browserSync.reload),
   gulp.watch('js/**/*.js', gulp.series('js')),
   gulp.watch("img/**/*.{png,jpg}", gulp.series("images")),
   gulp.watch("img/**/*.{png,jpg}", gulp.series("allimg"))
    gulp.watch("img/**/*.{svg}", gulp.series("svg"))
});

gulp.task('default', gulp.series(
   gulp.parallel('html', 'css', 'js','images', 'allimg', 'svg'),
   gulp.parallel('watch', 'serve', )
));