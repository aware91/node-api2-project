const express = require('express');
const postRouter = require('./post/post-router.js');

const server = express();
server.use(express.json());
server.use('/api/post', postRouter);
server.use('/something/anything', postRouter);

server.get('/', (req, res)=>{
  res.send(`
    <h2>Node API 2 Project</h2>
  `);
});

module.exports = server;