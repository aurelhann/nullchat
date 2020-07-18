/* eslint-disable no-console */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import copy from 'rollup-plugin-copy-assets';
import cleaner from 'rollup-plugin-cleaner';
import progress from 'rollup-plugin-progress';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import copy2 from 'rollup-plugin-copy';
import path from 'path';
import nodejs from './replace'

export default [
    {

        input: './runnull.js',
        output: {
            file: path.join(__dirname, '.bin', 'null.js'),
            format: 'cjs',
        },
        plugins: [
            progress(),

            resolve({
                preferBuiltins: true
            }),
            json(),

            // Pass options here (optional)
            cleaner({
                targets: ['./.bin/'],
            }),
            replace({
                'commonjsRequire.resolve': 'require.resolve'
            }),
            commonjs(),
            nodejs(),
            copy({
                assets: ['./public', './views', './directives'],
                silent: false,
            }),
            copy2({
                targets: [
                    { src: require.resolve('socket.io-client/dist/socket.io.js'), dest: '.bin/node_modules/socket.io-client/dist' },
                    { src: require.resolve('socket.io-client/dist/socket.io.js.map'), dest: '.bin/node_modules/socket.io-client/dist' },
                ]
            })
        ],
    },
];
