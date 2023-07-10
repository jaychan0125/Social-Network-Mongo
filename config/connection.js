const { connect, connection } = require('mongoose');            //import mongoose library

connect('mongodb://127.0.0.1:27017/socialNetworkDB');           //set connection with URI  database: SocialNetworkDB

module.exports = connection;                                    //export connection to main index.js