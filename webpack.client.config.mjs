import path from 'path';
import { fileURLToPath } from 'url';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack'
const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
export default {
    entry: './src/client.js',
    output: {
        filename: 'main.js',
        path: path.resolve(rootDirectory, 'public'),
        library: {
            type: 'module'
        }
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            { 
                test: /\.css$/i, 
                use: ["style-loader", "css-loader"]
            },
             { test: /\.vue$/, loader: 'vue-loader' } ] }, plugins: [ 
                new VueLoaderPlugin(),
                new webpack.DefinePlugin({
                    __VUE_OPTIONS_API__: false, __VUE_PROD_DEVTOOLS__: false, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false }) ] }