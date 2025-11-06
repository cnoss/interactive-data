const { Transformer } = require('markmap-lib');

exports.data = function () {
  return {
    layout: 'default.11ty.js',
  };
};

// Use function (not arrow) to keep Eleventy context if needed
exports.render = function (data) {
  const subtitle = data.subtitle ? `<h2 class="subtitle">${data.subtitle}</h2>` : '';

  const transformer = new Transformer();
  const { root } = transformer.transform(data.content);

  const script = `
    <script>
      (async () => {
        const { Markmap } = window.markmap;
        const options = {
          colorFreezeLevel: ${data.markmap?.colorFreezeLevel ?? 1},
          nodeColor: ${data.markmap?.color ? `'${data.markmap.color}'` : 'null'},
        };
        const svgEl = document.querySelector('#mindmap');
        const mm = await Markmap.create(svgEl, options, ${JSON.stringify(root)});        
      })();
    </script>
  `;

  const style = `
    <style>
      #mindmap {
        --markmap-text-color: #fff;
        --markmap-font: 300 12px/15px var(--font-family-sans);
      }

      .svg-canvas { width: 100%; height: 70vh; }
    </style>
  `;

  return `
    ${style}
    <main>
      <h1 class="title">${data.title}</h1>
      ${subtitle}
      <svg id="mindmap" class="svg-canvas"></svg>
      ${script}
    </main>
  `;
};

