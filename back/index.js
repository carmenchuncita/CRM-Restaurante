const express = require('express');
require('dotenv').config();  

const connectDB = require('./src/utils/db_mongo');
connectDB();  

const routes = require('./src/api/routers/routes'); 

const server = express();
server.use(express.json());  

server.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

server.use('/api', routes);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
