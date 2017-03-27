import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";  
import * as webpackConfig from "./webpack.config.js";

const env = process.env.NODE_ENV || 'development';
const port = process.env.NODE_PORT || 9000;
const DIST_DIR = path.join(__dirname, 'dist');
const compiler = webpack(webpackConfig);   
const app = express();

app.set('port', port);
app.use(express.static(DIST_DIR));
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/'
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res, next) => {
  const filename = path.join(DIST_DIR, 'index.html');

  compiler.outputFileSystem.readFile(filename, (error, result) => {
    if (error) {
      return next(error);
    }

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.get('/coords/:city', (req, res) => {
    const cityName = req.params.city;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}`;
    const retrieveCoords = (data) => {
      return data.results[0].geometry.location;
    };

    fetch(url)
      .then(data => data.json())
      .then(data => retrieveCoords(data))
      .then(data => res.json(data))
      .catch(error => console.log(error));
});

app.listen(app.get('port'), (error) => {
  if (error) {
    console.log(`The text error iccurred while running server: ${error}`);    
  } else {
    console.log(`App is running on port ${app.get('port')}`);
  }    
});