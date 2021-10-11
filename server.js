const express = require('express');
const server = express();
const cors = require('cors')
require('dotenv/config');
const db = require('./api/config/db');
const PORT = process.env.PORT || 8080

server.use(express.json());

// PUBLIC API 
server.use(cors())

// ROUTES 
server.use('/api/v1/auth', require('./api/routes/auth.router'));
server.use('/api/v1/user', require('./api/routes/user.router'));
server.use('/api/v1/admin', require('./api/routes/admin.router'));
server.use('/api/v1/category', require('./api/routes/category.router'));
server.use('/api/v1/service', require('./api/routes/service.router'));


// DB CONNECT & LISTEN PORT 
db.connect()
    .then(()=>{
        console.log("Connected to mongoDB success");
        server.listen(PORT, () => {
            console.log('run server port http://localhost:'+PORT);
        });
    });