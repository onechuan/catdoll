
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';


export default [
  {
    input: [`./src/index.ts`],
    output: [
      {
        file: `./dist/index.js`,
        format: 'iife',
        name: 'webMonitorSdk',
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
          file: `./dist/index.esm.js`,
          format: 'esm',
          name: 'webMonitorSdk',
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
          name: 'webMonitorSdk',
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
