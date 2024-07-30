import env from "~/env";

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/', {
      target: env.REACT_APP_API_URL,
      changeOrigin: true,
    }),
  );
};