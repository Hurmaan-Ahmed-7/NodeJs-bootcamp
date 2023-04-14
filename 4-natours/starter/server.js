require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) 
  .then(() => {
    console.log('-------db connected successfully--------');
    console.log(`running on ${process.env.NODE_ENV} environment.......`);
  });

//listening on localhost
const port = process.env.PORT || 3000;
const serverOn = app.listen(port, (req, res) => {
  console.log(`listening on port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection, shutting down');
  serverOn.close(() => {
    process.exit(1);
  });

  process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('uncaught exception, shutting down');
    serverOn.close(() => {
      process.exit(1);
    });
  });
});
