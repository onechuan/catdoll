import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import path from 'path';


export default {
    input: path.join(__dirname, './index.ts'),
    output: [{
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: false
    },{
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: false
    }],
    plugins: [
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    module: 'ESNext'
                }
            },
            useTsconfigDeclarationDir: true
        }),
        dts({
            output: 'dist/index.d.ts'
        }),
        terser({
            compress: {
                level: 2
            },
            format: {
                comments: false
            }
        }),
    ],
}