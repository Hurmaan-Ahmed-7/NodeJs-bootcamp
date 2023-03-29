require('dotenv').config(
  { path: './config.env'}
);
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => {
//     console.log('-------db connected successfully--------');
//   });

//listening on localhost
const port = 3000;
app.listen(port, (req, res) => {
  console.log(`listening on port: ${port}`);
});
