import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const dev = !!process.env.ROLLUP_WATCH;

export default {
  input: "src/car-status.ts",
  output: {
    dir: "dist",
    entryFileNames: "car-status.js",
    format: "es",
    inlineDynamicImports: true,
    sourcemap: dev,
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: dev,
      inlineSources: dev,
    }),
    !dev && terser({ ecma: 2021, format: { comments: false } }),
  ].filter(Boolean),
};
