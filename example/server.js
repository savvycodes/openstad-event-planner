const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  createProxyMiddleware('/api', {
    target: 'http://localhost:4444',
    changeOrigin: true,
  })
);
app.use(
  createProxyMiddleware('/image', {
    target: 'http://localhost:4444',
    changeOrigin: true,
  })
);

const bundler = new Bundler('index.html');
app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));
