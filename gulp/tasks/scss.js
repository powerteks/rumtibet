
import * as dartSass from 'sass';
import gulpSass from "gulp-sass";
import cleanCss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import rename from "gulp-rename";

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemap: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
					groupCssMediaQueries())
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
					autoprefixer({
						grid: true,
						overrideBrowserslist: ["last 5 version"],
						cascade: true
			}))
		)
		.pipe(
			app.plugins.if(
				app.isBuild,app.gulp.dest(app.path.build.css))
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
					cleanCss())
		)
		.pipe(rename({
						extname: ".min.css"
			})
		)
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}