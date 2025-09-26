// Assignment:
// Create a web server that has a homepage, a users-page, and a form to create a user.
// - On '/' add a greeting and an input field where the user can fill out their username.
// - On '/users' add a list of users.
// - On '/create-user' parse the form data and console.log the username.
// - When the user submits the form, redirect them to the homepage.

const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body><h1>Welcome</h1><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Versturen</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const userName = parsedBody.split('=')[1]
            console.log(userName);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        })
    }
});

server.listen(3000);