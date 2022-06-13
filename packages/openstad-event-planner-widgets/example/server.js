const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  createProxyMiddleware('/api', {
    target: 'http://localhost:8111',
    changeOrigin: true,
    pathRewrite: {
      '^/api/oauth': '/oauth',
      '^/api/api': '/api',
    },
    // onProxyReq: function(proxyReq, req) {
    //   proxyReq.setHeader('cookie', req.headers.cookie);
    // },
    // onProxyRes: function(proxyRes, req, res) {
    //   const proxyCookie = proxyRes.headers['set-cookie'];
    //   if (proxyCookie) {
    //     res.setHeader('cookie', proxyCookie);
    //   }
    // },
  })
);
app.use(
  createProxyMiddleware('/image', {
    target: 'http://localhost:3333',
    pathRewrite: { ['^/image']: '/image' },
    onProxyReq: (proxyReq, req, res) => {
      // add custom header to request
      proxyReq.setHeader('Authorization', `Bearer xxxxxx`);
    },
  })
);

const bundler = new Bundler('index.html');
app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));
