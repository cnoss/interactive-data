const del = require("del");


const config = {
  "dist": "./docs",
  "pathPrefix": {
    "prod": "interactive-data",
    "development": ""
  },
};


module.exports = async function (eleventyConfig) {
  
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

  /* Collections
  ########################################################################## */
  
  eleventyConfig.addCollection("mindmap", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/mindmaps/**/*.md");
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
      '11ty.js'
    ],
  };
};
