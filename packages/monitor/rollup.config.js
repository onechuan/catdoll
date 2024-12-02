
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';


const packagesDir = filePath => path.resolve(__dirname, filePath);

export default [
    {
      input: [`./src/index.ts`],
      output: [
        {
          file: `./dist/index.js`,
          format: 'esm',
          name: 'catdoll',
          sourcemap: true
        }
      ],
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              module: 'ESNext'
            }
          },
          useTsconfigDeclarationDir: true
        }),
        terser()
      ]
    }, {
      input: [`./src/index.ts`],
      output: [
        {
          file: `./dist/index.cjs`,
          format: 'cjs',
          name: 'catdoll',
          sourcemap: true
        }
      ],
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              module: 'ESNext'
            }
          },
          useTsconfigDeclarationDir: true
        }),
        terser()
      ]
    },
    {
      input: [`./src/index.ts`],
      output: [
        {
          file: `./dist/index.d.ts`,
        }
      ],
      plugins: [dts()]
    },
  ];
