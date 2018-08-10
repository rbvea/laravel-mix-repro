const mix = require("laravel-mix");
const purgecssWebpackPlugin = require("purgecss-webpack-plugin");
require("laravel-mix-tailwind");
const glob = require("glob");

if (!process.env.OPTIMIZE_CSS) {
  mix.js("./index.js", "./dist/app.js");
}

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

mix
  .sass("./style.scss", "./dist/style.css")
  .tailwind()
  .webpackConfig({
    plugins: [
      new purgecssWebpackPlugin({
        paths: [].concat(glob.sync(__dirname + "/*.html")),
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ["html"]
          }
        ]
      })
    ]
  });
