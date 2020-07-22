import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
export default {
    input: 'src/returnAction.js',
    output: {
        file: 'dist/returnAction.js',
        format: 'umd',
        name: 'returnAction'
    },
    plugins: [
        resolve(),
        babel({ babelHelpers: 'bundled' })
    ]
};