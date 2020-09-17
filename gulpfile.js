var gulp = require('gulp');
var scss = require('gulp-sass');
var minify = require('gulp-uglifycss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

var postcss     = require('gulp-postcss');
var reporter    = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint   = require('stylelint');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);
var fontName = 'Icons';


gulp.task('scss', function(){
  return gulp.src('assets/scss/main.scss')
    .pipe(scss())
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("scss-lint", function() {

  var stylelintConfig = {
     rules: {
    "at-rule-name-case": "lower",
    "at-rule-name-space-after": "always-single-line",
    "at-rule-semicolon-newline-after": "always",
    "block-closing-brace-empty-line-before": "never",
    "block-closing-brace-newline-before": "always-multi-line",
    "block-closing-brace-space-before": "always-single-line",
    "block-opening-brace-newline-after": "always-multi-line",
    "block-opening-brace-space-after": "always-single-line",
    "block-opening-brace-space-before": "always",
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "comment-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["stylelint-commands"],
      },
    ],
    "comment-whitespace-inside": "always",
    "custom-property-empty-line-before": [
      "always",
      {
        except: ["after-custom-property", "first-nested"],
        ignore: ["after-comment", "inside-single-line-block"],
      },
    ],
    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-block-semicolon-newline-after": "always-multi-line",
    "declaration-block-semicolon-space-after": "always-single-line",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-single-line-max-declarations": 1,
    "declaration-block-trailing-semicolon": "always",
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    "declaration-empty-line-before": [
      "always",
      {
        except: ["after-declaration", "first-nested"],
        ignore: ["after-comment", "inside-single-line-block"],
      },
    ],
    "function-comma-newline-after": "always-multi-line",
    "function-comma-space-after": "always-single-line",
    "function-comma-space-before": "never",
    "function-max-empty-lines": 0,
    "function-name-case": "lower",
    "function-parentheses-newline-inside": "always-multi-line",
    "function-parentheses-space-inside": "never-single-line",
    "function-whitespace-after": "always",
    // indentation: 2,
    "length-zero-no-unit": true,
    "max-empty-lines": 1,
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-name-case": "lower",
    "media-feature-parentheses-space-inside": "never",
    "media-feature-range-operator-space-after": "always",
    "media-feature-range-operator-space-before": "always",
    "media-query-list-comma-newline-after": "always-multi-line",
    "media-query-list-comma-space-after": "always-single-line",
    "media-query-list-comma-space-before": "never",
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    "property-case": "lower",
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],
    "selector-attribute-brackets-space-inside": "never",
    "selector-attribute-operator-space-after": "never",
    "selector-attribute-operator-space-before": "never",
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    "selector-descendant-combinator-no-non-space": true,
    "selector-list-comma-newline-after": "always",
    "selector-list-comma-space-before": "never",
    "selector-max-empty-lines": 0,
    "selector-pseudo-class-case": "lower",
    "selector-pseudo-class-parentheses-space-inside": "never",
    "selector-pseudo-element-case": "lower",
    "selector-pseudo-element-colon-notation": "double",
    "selector-type-case": "lower",
    "unit-case": "lower",
    "value-keyword-case": "lower",
    "value-list-comma-newline-after": "always-multi-line",
    "value-list-comma-space-after": "always-single-line",
    "value-list-comma-space-before": "never",
    "value-list-max-empty-lines": 0,
  	}
  }

  var processors = [
    stylelint(stylelintConfig),
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];

  return gulp.src(
      ['assets/scss/sections/*.scss','assets/scss/*.scss','assets/scss/general/*.scss','assets/scss/utilities/*.scss']
    )
    .pipe(postcss(processors, {syntax: syntax_scss}));
});

gulp.task('watch', function(){
	browserSync.init({
        server: {
           baseDir: "./",
        }
    });
    gulp.watch('assets/scss/**/*.scss', gulp.series('scss-lint'));
    gulp.watch('assets/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./*.js').on('change', browserSync.reload);
});
 

gulp.task('iconfont', function(){
  return gulp.src(['assets/svg-icons/*.svg']) 
    .pipe(iconfontCss({
      fontName: fontName, 
      path: 'assets/scss/templates/_icons.scss', 
      targetPath: '../../scss/partials/_icons.scss', 
      fontPath: '../../assets/fonts/icons/'
    }))
    .pipe(iconfont({
      prependUnicode: false, 
      fontName: fontName, 
      formats: ['ttf', 'eot', 'woff', 'woff2'], 
      normalize: true,
      timestamp: runTimestamp 
    }))
    .pipe(gulp.dest('assets/fonts/icons/'));
});

gulp.task('build', gulp.series(['iconfont', 'scss']));




