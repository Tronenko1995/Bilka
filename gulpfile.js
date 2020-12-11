//Поключаем модули галпа
const gulp = require('gulp');
//const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cssmin = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const jsmin = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgsprite = require("gulp-svgstore");
const cheerio = require('gulp-cheerio');
const svgmin = require('gulp-svgmin');
const replace = require('gulp-replace');
const cache = require('gulp-cache');

//Порядок подключения css файлов
const cssFiles = [
  './src/scss/config.scss',
  './src/scss/fonts.scss',
  './src/scss/header.scss',
  './src/scss/description.scss',
  './src/scss/navigation.scss',
  './src/scss/mobile-menu.scss',
  './src/scss/mobile-catalog.scss',
  './src/scss/slider.scss',
  './src/scss/types.scss',
  './src/scss/new_items.scss',
  './src/scss/top_sales.scss',
  './src/scss/news.scss',
  './src/scss/about.scss',
  './src/scss/last-review.scss',
  './src/scss/footer.scss',
  './src/scss/cart.scss',
  './src/scss/svg.scss',
  './src/scss/include/breadcrumb.scss',
  './src/scss/include/select.scss',
  './src/scss/include/checkbox.scss',
  './src/scss/include/color.scss',
  './src/scss/include/rating.scss',
  './src/scss/include/modal.scss',
  './src/scss/include/new-accordion.scss',
  './src/scss/404/404.scss',
  './src/scss/page-category/page-category.scss',
  './src/scss/page-category/sidebar.scss',
  './src/scss/page-category/main-container.scss',
  './src/scss/page-category/recommended-products.scss',
  './src/scss/page-category/accordion-info.scss',
  './src/scss/page-category/accordion-questions.scss',
  './src/scss/page-card/page-card.scss',
  './src/scss/page/about-shop.scss',
  './src/scss/page/pay-delivery.scss',
  './src/scss/page/warranty.scss',
  './src/scss/page/contacts.scss',
  './src/scss/page/privacy-policy.scss',
  './src/scss/page/user-agreement.scss',
  './src/scss/page/page-news.scss',
  './src/scss/page/page-find.scss',
  './src/scss/page/articles-news.scss',
  './src/scss/page/one-step.scss',
  './src/scss/page/page-compare.scss',
  './src/scss/page/private-office.scss',
  './src/scss/change.scss'
]
// //Порядок подключения js файлов
// const jsFiles = [
// 	'./src/js/lib.js',
// 	'./src/js/main.js'
// ]

function styles() {
	return gulp.src(cssFiles)
	// .pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(concat('style.css'))
	.pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cssmin({
  	level: 2
  }))
  // .pipe(sourcemaps.write('./'))
  .pipe(rename({
  	suffix: '.min'
  }))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream());
}


function scripts() {
	return gulp.src('./src/js/**/*.js')
	.pipe(concat('app.js'))
 // .pipe(babel({
 //          presets: ['@babel/env']
 //      }))
        // .pipe(babel({
        //     plugins: ['@babel/transform-runtime']
        // }))
	// .pipe(jsmin({
	// 	toplevel: false
	// }))
  .pipe(rename({
  	suffix: '.min'
  }))
	.pipe(gulp.dest('./js'))
	.pipe(browserSync.stream());
}

function libs() {
	return gulp.src('./src/libs/**/*.**')
	.pipe(gulp.dest('./libs'))
}

function images() {
  // return gulp.src("src/img/**/*.{png,jpg,jpeg}")
  return gulp.src("src/img/**/*.**")
  .pipe(cache(imagemin([
    // imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 85, progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
  ])))
	.pipe(gulp.dest("./img"));
}

function webpfun() {
	return gulp.src("./src/img/**/*.{png,jpg,jpeg}")
	.pipe(webp())
	.pipe(gulp.dest("./img"));
}

function sprite() {
  return gulp.src("./src/img/sprite/*.svg")
  .pipe(svgmin({
    js2svg: {
      pretty: true
    }
  }))
  .pipe(cheerio({
    run: function ($) {
      $('style').remove();
      $('title').remove();
      $('path').removeAttr('class');
    },
    parserOptions: {xmlMode: true}
  }))
  .pipe(replace('&gt;', '>'))
  .pipe(svgsprite ({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))

  .pipe(gulp.dest("./img/sprite"));
}


function clear() {
	return del(['css/*','js/*']);
}

function clean() {
  return cache.clearAll();
}


function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
      ghostMode: false,
      port: 3000,
      notify: true
    }
  });
  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  // gulp.watch("./src/img/**/*.{png,jpg,jpeg}", gulp.series(images, webpfun))
  gulp.watch("./src/img/**/*.{png,jpg,jpeg}", images);
  gulp.watch("./src/img/**/*.svg", sprite);
  gulp.watch('./src/libs/**/*.**', libs);
  gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('clean', clean);
gulp.task('clear', clear);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task("images", images);
gulp.task("webp", webpfun);
gulp.task("sprite", sprite);
gulp.task('libs', libs);
gulp.task('watch', watch);

// gulp.task('build', gulp.series(clear, gulp.parallel(styles,scripts), images, webpfun, sprite, libs));
gulp.task('build', gulp.series(clear, gulp.parallel(styles,scripts), images));
gulp.task('dev', gulp.series('build','watch'));