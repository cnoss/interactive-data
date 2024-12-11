const defaultLayout = require("./default.11ty.js");
const Transformer = require('markmap-lib').Transformer;


module.exports = function (data, eleventy) {

  const subtitle = data.subtitle ? `<h2 class="subtitle">${data.subtitle}</h2>` : '';

  const transformer = new Transformer();
  const { root, features } = transformer.transform(data.content);

  const script = `
    <script>
      const { Markmap, loadCSS, loadJS } = markmap;
      const options = undefined;
      const svgEl = document.querySelector('#mindmap');
      Markmap.create(svgEl, options, ${JSON.stringify(root)}).fit();
    </script>
  `;

  const style = `
    <style>
      #mindmap {
      --markmap-text-color: #fff;
      --markmap-font: 300 15px/20px var(--font-family-sans);
      }
    </style>
  `;


  const mindmapContent = `

    ${style}
    


    <main>
      <h1 class="title">${data.title}</h1>
      ${subtitle}
      <svg id="mindmap" style="width: 1800px; height: 800px"></svg>
      ${script}

    </main>

  `;

  // Pass the article content to the base layout
  //return defaultLayout({
  //  ...data, // Spread in all data (like title, metadata)
  //  content: articleContent, // Override content with the article's content
  //});

  return defaultLayout.render({
    ...data,
    content: mindmapContent,
  });
};

