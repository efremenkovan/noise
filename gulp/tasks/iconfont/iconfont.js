var gulp         = require('gulp');
var svgmin       = require('gulp-svgmin');
var consolidate  = require('gulp-consolidate');
var _            = require('lodash');
var config       = require('../../config');
// var runTimestamp = Math.round(Date.now() / 1000);

var fontProps = {
    fontName: 'iconfont',
    fontPath: 'fonts/',
    className: 'icon'
};

gulp.task('iconfont', function() {
    return gulp.src([config.src.iconsFont + '/*.svg'])
        .pipe(svgmin())
        .on('glyphs', function(glyphs, options) {
            // generate icons preview
            gulp.src(__dirname + '/iconfont.html')
                .pipe(consolidate('lodash', props))
                .pipe(gulp.dest(config.dest.root));
        })
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('iconfont:watch', function() {
    gulp.watch(config.src.iconsFont + '/*.svg', ['iconfont']);
});
