const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglifycss = require('gulp-uglifycss');
const server = require('gulp-server-livereload');
const browserify = require('gulp-browserify')
gulp.task('sass', () => {
// return gulp.src('./styles.scss')
    //  .pipe(sass())
    // return sass('./main.css')
    return gulp.src('./main.css')
    //  .pipe(uglifycss({
    //   "maxLineLen": 80,
    //   "uglyComments": true
    // }))
    .pipe(gulp.dest('./public'));
})

gulp.task('babel', () => {
	return gulp.src('./app.js')
		.pipe(babel({
		}))
		.pipe(gulp.dest('./public'));
});

gulp.task('webserver', () => {
  gulp.src('./public')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
gulp.task('html', function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./public'));
});
gulp.task('jpg',function(){
  return gulp.src('./AESTHETIC.jpg')
  .pipe(gulp.dest('./public'));
})
gulp.task('js', function(){
 gulp.src('./app.js')
  .pipe(babel({
    presets:['es2015']
  }))
  .pipe(browserify())
  .pipe(gulp.dest('./public/js'));
});
gulp.task('browserify', function() {
	gulp.src('./app.js')
		.pipe(browserify({
		  insertGlobals : true,
		  debug : !gulp.env.production
		}))
		.pipe(gulp.dest('./public'))
});
gulp.task('watch',function(){
  gulp.watch('./app.js', ['js'])
  gulp.watch('./index.html',['html'])
})
gulp.task('default', ['html', 'sass', 'webserver',"js",]);
