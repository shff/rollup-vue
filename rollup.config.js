import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import serve from "rollup-plugin-serve";
import babel from "rollup-plugin-babel";
import gzip from "rollup-plugin-gzip";
import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";

import removeUnusedCSS from "postcss-remove-unused-css";
import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
import cssnano from "cssnano";

import { compress } from "brotli";

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
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnano(),
        removeUnusedCSS({
          path: "./app",
        }),
      ],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
    }),
    terser(),
    gzip(),
    gzip({
      customCompression: content => compress(Buffer.from(content)),
      fileName: ".br",
    }),
    watch && serve({
      open: true,
      contentBase: "dist",
    }),
    vue(),
  ],
};
