const express = require('express');
const http = require('http')
const router = require('./routes/index.js');

const port = process.env.PORT || 3003;
const app = express()
    
// our server instance
const server = http.createServer(app)

//open the socket.io
require('./controllers/socket')(server)

app.use('/api', router)

// When a "message" is received (click on the button), it's logged in the console
server.listen(port, () => console.log(`Listening on port ${port}`))
