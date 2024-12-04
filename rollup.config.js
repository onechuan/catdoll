import fs from 'fs';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';


const packagesDir = path.resolve(__dirname, 'packages');
const packageFiles = fs.readdirSync(packagesDir);

function output(path) {
  return [{
    input: [`./packages/${path}/src/index.ts`],
    output: [
      {
        file: `./packages/${path}/dist/index.js`,
        format: 'iife',
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
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.esm.js`,
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
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.cjs`,
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
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.d.ts`,
        }
      ],
      plugins: [dts()]
    },
  ];
}

export default [...packageFiles.map((path) => output(path)).flat()];
