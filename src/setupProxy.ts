
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

//@ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app: any) {
    console.log('PROXY IS RUNNING')
  app.use(createProxyMiddleware('/',{
      target: 'https://kiosk-api.kiosk-frontend.finpro.pw',
      changeOrigin: true,
      ws: true
    })
  );
};