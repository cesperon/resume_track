const cors = require('cors');
const express = require('express');
const apiRoutes = require('../routes/api.js');

module.exports = (app) => {
  
  // middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // Api Routes
  app.use( apiRoutes);  
  //*previous*app.use('/api/v1', apiRoutes);  
  
}