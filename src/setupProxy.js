
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
// 	// app.use(createProxyMiddleware('/', {
// 	// 	target: 'https://kiosk-api.kiosk-frontend.finpro.pw',
// 	// 	"changeOrigin": true
//     // }));
//     module.exports = function(app) {
//         app.use(
//           '/',
//           createProxyMiddleware({
//             target: 'https://kiosk-api.kiosk-frontend.finpro.pw',
//             changeOrigin: true,
//           })
//         );
//       };
//     // app.use(createProxyMiddleware("/socket", {target: "http://kiosk-api.kiosk-frontend.finpro.pw", ws: true}))
// };

// // "proxy": "https://kiosk-api.kiosk-frontend.finpro.pw",

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/', createProxyMiddleware(['/cashpro', '/oauth2'],{
    target: 'https://kiosk-api.kiosk-frontend.finpro.pw',
    changeOrigin: true,
    secure:false
  })
  );
  app.use('/', createProxyMiddleware('/socket', { 
    target: 'wss://wss.kiosk-frontend.finpro.pw',
    changeOrigin: true,
    secure: false,
    ws: true 
  }))
};