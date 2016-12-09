var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var paths = {
	src: 'src',
	dist: 'dist'
};
console.log(plugins)
var files = {
	js: paths.src + "/*.js",
	css: paths.src + "/*.css",
	images: paths.src + "/*.{jpg,png,svg,gif,webp,ico}",
};

// 清洁
gulp.task('clean', function() {
	return gulp.src(paths.dist)
		.pipe(plugins.clean({
			force: true
		}));
});
// 生产
gulp.task("scripts", function() {
	return gulp.src(files.js)
		.pipe(plugins.concat("jquery.imgspreview.min.js"))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.dist));
});
gulp.task("styles", function() {
	return gulp.src(files.css)
		.pipe(plugins.concat("jquery.imgspreview.min.css"))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest(paths.dist))
});
gulp.task("images", function() {
	return gulp.src(files.images)
		.pipe(plugins.newer(paths.dist))
		.pipe(gulp.dest(paths.dist));
});
// 默认
gulp.task('default', ["images", "styles", "scripts"]);
