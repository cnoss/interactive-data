
const metaDataHeader = require('./components/meta-data-head.11ty');

// eslint-disable-next-line func-names
exports.render = function (data) {
  
  const metaDataHead = metaDataHeader.getHeader(data);
  const cssHref = this.url('/assets/_compiled/styles/combined-styles.css');

  const markmapLib = this.url('/assets/scripts/markmap-lib.min.js');
  const markmapView = this.url('/assets/scripts/markmap-view.min.js');
  const d3Script = this.url('/assets/scripts/d3.min.js');
  const markmapToolbarScript = this.url('https://cdn.jsdelivr.net/npm/markmap-toolbar@0.18.12/dist/index.min.js');
  

  return `<!doctype html> 
  <html lang="de">
    <head>
      <title>${data.title} :: Map</title>
      ${metaDataHead}
      <link href="${cssHref}" rel="stylesheet">
    
      <script src="${d3Script}"></script>
      <script src="${markmapLib}"></script>
      <script src="${markmapView}"></script>
      <script src="${markmapToolbarScript}"></script>

    </head>
    <body class="mindmap">
        ${data.content}
    </body>
  </html>`;
};
