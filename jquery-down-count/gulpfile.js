var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var paths = {
	src: 'src',
	dist: 'dist'
};
console.log(plugins)
var files = {
	js: paths.src + "/*.js",
};

// 清洁
gulp.task('clean', function() {
	return gulp.src(paths.dist)
		.pipe(plugins.clean({
			force: true
		}));
});
// 生产
gulp.task("build", ['clean'], function() {
	return gulp.src(files.js)
		.pipe(plugins.concat("jquery.downcount.min.js"))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.dist));
});
// 默认
gulp.task('default', ["build"]);