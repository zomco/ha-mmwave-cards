import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

const dev = process.env.ROLLUP_WATCH === "true";

export default {
  input: "src/mmwave-card.ts",
  output: {
    file: "dist/mmwave-card.js",
    format: "es",
    sourcemap: dev,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: dev,
      inlineSources: dev,
    }),
    !dev &&
      terser({
        ecma: 2022,
        module: true,
        compress: { drop_console: false },
        format: { comments: false },
      }),
  ].filter(Boolean),
};
