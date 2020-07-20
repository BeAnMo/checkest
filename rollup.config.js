import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/check-mate.js',
            format: 'cjs'
        },
    ],
    plugins: [babel()]
};