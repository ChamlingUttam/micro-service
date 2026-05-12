// const express = require('express')
// const expressProxy = require('express-http-proxy')

// const app = express()


// app.use('/user', expressProxy('http://localhost:3001'))
// app.use('/uber', expressProxy('http://localhost:3002'))
// app.use('/ride', expressProxy('http://localhost:3003'))


// app.listen(3000, () => {
//     console.log('Gateway server listening on port 3000')
// })



const express = require('express');
const expressProxy = require('express-http-proxy');

const app = express();

app.use('/user', expressProxy('http://localhost:3001', {
  proxyReqPathResolver: (req) => req.url.replace('/user', '')
}));

app.use('/uber', expressProxy('http://localhost:3002', {
  proxyReqPathResolver: (req) => req.url.replace('/uber', '')
}));

app.use('/ride', expressProxy('http://localhost:3003', {
  proxyReqPathResolver: (req) => req.url.replace('/ride', '')
}));

app.listen(3000, () => {
  console.log('Gateway server listening on port 3000');
});


















