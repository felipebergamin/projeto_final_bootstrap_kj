var gulp 				= require("gulp");
var sass 				= require("gulp-sass");
var htmlmin 		= require("gulp-htmlmin");
var notify 			= require("gulp-notify");
var concat 			= require("gulp-concat");
var uglify 			= require("gulp-uglify");
var browserSync = require("browser-sync").create();
var del 				= require("del");

/* Tasks cached */
gulp.task("cache:css", function() {
	del("./dist/css/style.css");
});

gulp.task("cache:js", function() {
	del("./dist/js/app.js");
});

gulp.task("cache:img", function() {
	del.sync('./dist/img');
});

gulp.task("cache:fa", function() {
	del.sync('./dist/fonts');
});

gulp.task("copy-img", ["cache:img"], function() {
	return gulp.src('./src/img/**/*')
		.pipe(gulp.dest('./dist/img'));
});

gulp.task("copy-fa", ["cache:fa"], function() {
	return gulp.src('./src/components/components-font-awesome/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts/'));
});

/* Task compile scss to css */
gulp.task("sass", ['cache:css'], function() {
	return gulp.src("./src/scss/style.scss")
				.pipe(sass({outPutStyle: 'compressed'}))
				.on('error', notify.onError({title: "erro scss", message: "<%= error.message %>"}))
				.pipe(gulp.dest("./dist/css"))
				.pipe(browserSync.stream());
});

/* Task minify html */
gulp.task("html", function() {
	return gulp.src("./src/index.html")
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest("./dist"))
				.pipe(browserSync.stream());
});

/* Task minify js */
gulp.task("js", ['cache:js'], function() {
	return gulp.src("./src/js/app.js")
				.pipe(uglify())
				.pipe(gulp.dest("./dist/js"))
				.pipe(browserSync.stream());
});

/* Task concat js */
gulp.task("concat-js", function() {
	return gulp.src([
					'./src/components/jquery/dist/jquery.js',
					'./src/components/tether/dist/js/tether.js',
					'./src/components/bootstrap/dist/js/bootstrap.js'
				])
				.pipe(concat("main.js"))
				.pipe(gulp.dest("./dist/js"))

});

/* Task server local */
gulp.task("server", function() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});

	/* Watch */
	gulp.watch("./src/scss/**/*.scss", ['sass']);
	gulp.watch("./src/components/bootstrap/scss/**/*.scss", ['sass']);
	gulp.watch("./src/js/**/*.js", ['js']);
	gulp.watch("./src/index.html", ['html']);
	gulp.watch('./src/img/**/*', ['copy-img']);
});

gulp.task("default", ["copy-fa", "copy-img", "sass", "html", "js", "concat-js", "server"]);












