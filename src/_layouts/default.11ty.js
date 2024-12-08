
const metaDataHeader = require('./components/meta-data-head.11ty');




// eslint-disable-next-line func-names
exports.render = function (data) {
  
  const metaDataHead = metaDataHeader.getHeader(data);

  return `<!doctype html> 
  <html lang="de">
    <head>
      <title>${data.title} :: Map</title>
      ${metaDataHead}
      <link href="${this.url('/assets/_compiled/styles/combined-styles.css')}" rel="stylesheet">

      <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
      <script src="https://cdn.jsdelivr.net/npm/markmap-lib"></script>
      <script src="https://cdn.jsdelivr.net/npm/markmap-view"></script>
    </head>
    <body class="mindmap">
        ${data.content}
    </body>
  </html>`;
};
