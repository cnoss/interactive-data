const del = require("del");
// import { Transformer } from 'markmap-lib';

const Transformer = require('markmap-lib').Transformer;
const Markmap = require('markmap-lib').Markmap;

const config = {
  "dist": "./docs",
  "pathPrefix": "/markmap",
};



module.exports = (eleventyConfig) => {
    /* Compilation
    ########################################################################## */

  // Watch our js for changes
  eleventyConfig.addWatchTarget('./src/assets/scripts/main.js');
  // eleventyConfig.addWatchTarget('./src/_layouts/components/');

  // Copy _data
  eleventyConfig.addPassthroughCopy({ 'src/_data': 'assets/data' });
  eleventyConfig.addWatchTarget("./src/_data");

  // Watch our compiled assets for changes
  eleventyConfig.addPassthroughCopy('src/assets/_compiled');
  // eleventyConfig.addPassthroughCopy('./assets/_compiled');

  // Copy all fonts
  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });

  // Copy asset images
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });

  // Copy Scripts
  eleventyConfig.addPassthroughCopy({ 'src/assets/scripts': 'assets/scripts' });
  eleventyConfig.addWatchTarget("./src/assets/scripts");

  eleventyConfig.addPairedShortcode("mmmindmap", (input, id = "mindmap") => {
    const transformer = new Transformer();
    const { root, features } = transformer.transform(input);

    return {
      id,
      root,
      features,
    };

    
    return `
      <svg id="${id}" style="width: 800px; height: 800px"></svg>
      <script>
      svgEl = document.querySelector('#${id}');
      Markmap.create(svgEl, options, ${JSON.stringify(root)}).fit();
      </script>
    `.trim();
  });

  const pathPrefix = config.pathPrefix[process.env.ELEVENTY_ENV];

  return {
    dir: {
      includes: '_components',
      input: 'src',
      layouts: '_layouts',
      output: config.dist,
    },
    pathPrefix,
    htmlTemplateEngine: 'njk',
    templateFormats: [
      'md',
      'njk',
      'html',
      '11ty.js'
    ],
  };
};
