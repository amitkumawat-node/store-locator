var express = require('express');
var route  = express.Router();
var Store = require('../controllers/store');


route.get('/near-by-stores', Store.getNearByStore);
route.post('/add-store', Store.addStore);


module.exports=route;