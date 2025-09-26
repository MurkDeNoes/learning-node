const http = require('http');

const server = http.createServer(() => {
    console.log("Server running on port 3000")
});

server.listen(3000);