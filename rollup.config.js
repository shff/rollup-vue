import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import babel from 'rollup-plugin-babel';
import vue from "rollup-plugin-vue";
import { uglify } from 'rollup-plugin-uglify';

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
    postcss({
      "plugins": {
        "autoprefixer": {},
        "postcss-nested": {}
      }
    }),
    resolve(),
    uglify(),
    babel({ exclude: "node_modules/**" }),
    vue()
  ]
};
