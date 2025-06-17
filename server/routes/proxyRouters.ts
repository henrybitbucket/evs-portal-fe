import { Router } from 'express';
import * as proxy from 'express-http-proxy';
import * as url from 'url';
var fs = require('fs');

export default () => {
  const route = Router();
  route.use('/api',
    proxy(process.env.WWW_API_SERVICE_HOST, {
      proxyReqPathResolver: req => `/api/${url.parse(req.url).path}`.replace(/\/[\/]+/g, '/').replace('/api/v1', '/api'),
      limit: '10mb',
    }),
  );
  route.use('/health',
    proxy(process.env.WWW_API_SERVICE_HOST, {
      proxyReqPathResolver: () => `/health`,
      limit: '10mb',
    }),
  );
  route.use('/.well-known-lol/acme-challenge',
    proxy('http://[::]:81', {
      proxyReqPathResolver: (req) => {
        console.info('/.well-known/acme-challenge', `/.well-known/acme-challenge${url.parse(req.url).path}`);
        return `/.well-known/acme-challenge${url.parse(req.url).path}`;
      },
      filter: (req, res) => {
        console.info('filter /.well-known/acme-challenge', `/.well-known/acme-challenge${url.parse(req.url).path}`);
        res.removeHeader("x-powered-by");
        res.removeHeader("set-cookie");
        res.removeHeader("Date");
        res.removeHeader("Connection");
        console.info('--->req', req)
        return true;
      },
      proxyErrorHandler: (err, res, next) => {
        console.info("---has error", err, res)
        res.removeHeader("Connection");
        switch (err && err.code) {
          case 'ECONNRESET':    { return res.status(405).send('504 became 405'); }
          case 'ECONNREFUSED':  {
            res.status(200);
            return res;
          }
          default:              { next(err); }
        }
      },
      limit: '5mb',
    }),
  );

	route.get('/.well-known/acme-challenge/**', async (req, res) => {
	  let filePath = `/var/www/html${url.parse(req.url).path}`;
	  console.info('filePath', filePath)
    res.removeHeader("x-powered-by");
    res.removeHeader("set-cookie");
    res.removeHeader("Date");
    res.removeHeader("Connection");
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (!err) {
        console.log('received data: ' + data);
        res.writeHead(200, {'Content-Type': 'text/html'});
        if (!data) {
          data = filePath.replace(/.*\/([^\/]+)$/g, '$1') + ".oVuUVDJSvhzipFbcObziOGl2c5I81hJUWgIwGaoeHGA";
        }
        res.write(data);
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(filePath.replace(/.*\/([^\/]+)$/g, '$1') + ".oVuUVDJSvhzipFbcObziOGl2c5I81hJUWgIwGaoeHGA");
        res.end();
      }
    });
	});

  return route;
};
