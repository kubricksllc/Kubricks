const gulp = require("gulp");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");
const nodemon = require("nodemon");
const image = require('gulp-image');

gulp.task("js", () => {
  gulp
    .src("./src/index.js")
    .pipe(
      webpackStream(webpackConfig),
      webpack
    )
    .pipe(gulp.dest("./dist/"));
});

gulp.task("image", () => {
  gulp
    .src("./src/client/img/*")
    .pipe(image())
    .pipe(gulp.dest("./dist/img"))
});

gulp.task("serve", function() {
  return nodemon({
    script: "src/server/index.js"
  }).on("restart", function() {
    console.log("restarted");
  });
});

// Watch JS/JSX
gulp.task("watch", function() {
  gulp.watch("src/**/*.{js,jsx}", ["js"]);
});

gulp.task("default", ["js", "image", "serve", "watch"]);
