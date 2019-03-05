import livereload from "rollup-plugin-livereload";
import purifycss from "rollup-plugin-purifycss";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import serve from "rollup-plugin-serve";
import babel from "rollup-plugin-babel";
import vue from "rollup-plugin-vue";
import { uglify } from "rollup-plugin-uglify";

import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
import cssnano from "cssnano";

const watch = process.env.ROLLUP_WATCH === "true";

export default {
  input: "app/main.js",
  output: {
    name: "RollupVueApp",
    file: "dist/bundle.js",
    strict: true,
    format: "iife",
  },
  watch: {
    include: "app/**",
  },
  plugins: [
    watch && livereload(),
    purifycss({
      content: [
        "main/**/*.js",
        "main/**/*.html",
      ],
      options: {
        minify: true,
      },
    }),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnano(),
      ],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve(),
    uglify(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    watch && serve({
      open: true,
      contentBase: "dist",
    }),
    vue(),
  ],
};
