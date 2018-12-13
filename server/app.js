const express = require('express');
const PORT = process.env.PORT || 3003;
const http = require('http')
const router = require('./routes/index.js');

const app = express()
    
// our server instance
const server = http.createServer(app)

//open the socket.io
require('./controllers/socket')(server)

app.use('/api', router)

// When a "message" is received (click on the button), it's logged in the console
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
