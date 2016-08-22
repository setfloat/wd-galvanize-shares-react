'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');


// process.env.NODE_ENV == app.get('env')
switch(app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


// CSRF protection
app.use('/api', (req, res, next) => {
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});
//

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const bulletins = require('./routes/bulletins');

app.use('/api', bulletins);

// this line below binds http requests to return index.html  . As a result, it kicks off sending everything else, then React looks at the url requested, and trickles its way down through the app tree to deliver the right page.
// first index.html is returned.
// second <App /> is seen and instantiated.
// third React routing takes over and finds the path name and delivers the appropriate final path.


app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port);
});
