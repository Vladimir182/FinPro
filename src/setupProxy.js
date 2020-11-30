const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/', createProxyMiddleware(['/cashpro', '/oauth2'],{
    target: process.env.REACT_APP_URL_STAGE,
    changeOrigin: true,
    secure:false
  }));
  app.use('/', createProxyMiddleware('/socket', { 
    target: process.env.REACT_APP_WS_URL_STAGE,
    changeOrigin: true,
    secure: false,
    ws: true 
  }));
};