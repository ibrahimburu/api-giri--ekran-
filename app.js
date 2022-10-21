const express = require('express');
const app = express();
const env = require('dotenv').config();
const router = require('./routers/router');
const port = process.env.port||8080;
app.use(express.json());
app.use('/users',router);
app.use('/verify',router);
app.listen(port,()=>{
    console.log(`http://localhost:${port}/`)
})