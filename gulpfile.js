const gulp=require("gulp");
const tsc=require("gulp-typescript");

const ts=tsc.createProject("./tsconfig.json");

function tsCompile(){
   return  gulp.src("./src")
        .pipe(ts())
        .pipe(gulp.dest("./dist"));
}


gulp.task("tsc",tsCompile);