const app = require('./app');
//listening on localhost
const port = 3000;
app.listen(port, (req, res) =>{
  console.log('listening on port: ' + port);
});