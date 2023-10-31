const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Map file requests to their corresponding file paths
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Check if the requested file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            // Read and serve the requested file with the appropriate content type
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Function to determine the content type based on the file extension
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css'; // Add this line to serve CSS files
        default:
            return 'text/plain';
    }
}

