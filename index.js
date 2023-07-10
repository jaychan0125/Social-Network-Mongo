const express = require('express');
const db = require('./config/connection');      //require in connection to mongoose from connection.js
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));        //express middleware
app.use(express.json());
app.use(routes);

db.once('open', () => {                        //once database has been connected and open,  
  app.listen(PORT, () => {                    //listen on PORT
    console.log(`Server running on port ${PORT}!`);
  });
});
