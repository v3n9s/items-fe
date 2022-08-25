import 'webpack-dev-server';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default ({ ISDEV }: { ISDEV: true | undefined }): Configuration => {
  return {
    mode: ISDEV ? 'development' : 'production',
    entry: {
      index: './src/index'
    },
    devtool: ISDEV ? 'inline-source-map' : false,
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: ['ts-loader']
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    devServer: {
      port: 3000
    },
    resolve: {
      extensions: ['.ts', '.tsx', '...']
    },
    plugins: [
      new DotenvWebpackPlugin({
        safe: true
      }),
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin()
    ],
    output: {
      clean: true
    }
  };
}
