var fallback = require('connect-history-api-fallback');
var log = require('connect-logger');

module.exports = {
  "port": 8000,
  // "files": ["build/**/*.{js}"],
  "injectChanges": false, // workaround for Angular 2 styleUrls loading
  "watchOptions": {
    ignoreInitial: true,
    ignored: ['node_modules/**/*.js', 'node_modules/**/*.css']
  },
  "server": {
    "baseDir": "./build",
    "browser": ["google-chrome"],
    "middleware": [
      log({ format: '%date %status %method %url' }),
      fallback({
        index: '/index.html',
        // systemjs workaround
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] 
      })
    ]
  }
};
