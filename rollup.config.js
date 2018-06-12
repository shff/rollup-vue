import livereload from "rollup-plugin-livereload";
import purifycss from "rollup-plugin-purifycss";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import serve from "rollup-plugin-serve";
import babel from 'rollup-plugin-babel';
import vue from "rollup-plugin-vue";
import { uglify } from 'rollup-plugin-uglify';

import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";

export default {
  input: "app/main.js",
  output: {
    name: "RollupVueApp",
    file: "dist/bundle.js",
    strict: true,
    format: "iife"
  },
  watch: {
    include: "app/**"
  },
  plugins: [
    livereload(),
    purifycss({
      content: ["main/**/*.js", "main/**/*.html"],
      options: {
        minify: true
      }
    }),
    postcss({
      "plugins": [
        simplevars(),
        nested(),
        cssnano()
      ]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      ENV: JSON.stringify(process.env.NODE_ENV || "development")
    }),
    resolve(),
    uglify(),
    babel({ exclude: "node_modules/**" }),
    serve("dist"),
    vue()
  ]
};
