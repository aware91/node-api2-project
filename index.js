const server = require('./server');

server.listen(5500, ()=>{
  console.log('Server running on http://localhost:5500');
});