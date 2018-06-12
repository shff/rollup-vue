import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
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
    postcss({
      "plugins": [
        simplevars(),
        nested(),
        cssnext(),
        cssnano()
      ]
    }),
    resolve(),
    uglify(),
    babel({ exclude: "node_modules/**" }),
    vue()
  ]
};
