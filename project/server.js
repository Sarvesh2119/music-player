const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1'; // Set your desired hostname or '0.0.0.0' to make it accessible externally
const port = 3000; // Set your desired port number

const server = http.createServer((req, res) => {
    const filePath = req.url === '/' ? '/index.html' : req.url;
    const fileExtension = path.extname(filePath);
    const contentType = getContentType(fileExtension);

    fs.readFile(__dirname + filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    const fullURL = `http://${hostname}:${port}`;
    console.log(`Server is running at ${fullURL}`);
});

function getContentType(fileExtension) {
    switch (fileExtension) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpg';
        default:
            return 'application/octet-stream';
    }
};

