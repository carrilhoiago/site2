const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    // Define o tipo de conteúdo com base na extensão do arquivo
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
    }

    // Lê o arquivo e envia a resposta
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Arquivo não encontrado
                res.writeHead(404);
                res.end('Arquivo não encontrado');
            } else {
                // Erro no servidor
                res.writeHead(500);
                res.end('Erro no servidor');
            }
        } else {
            // Arquivo encontrado, envia o conteúdo
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});