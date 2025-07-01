import http from 'node:http';

// GET => Buscar um recurso do backend
// POST => Criar um recurso no backend
// PUT => Atualizar um recurso no backend
// PATCH => Atualizar uma informação específica de um recurso no backend
// DELETE => Deletar um recurso no backend

// stateful - stateful é quando o servidor guarda o estado do usuário
// stateless - stateless é quando o servidor não guarda o estado do usuário

const users = [];
 
const server = http.createServer((req, res) => {

    const { method, url } = req;

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Mark',
            email: 'mark@example.com',
        })

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end(JSON.stringify({
        message: 'Not Found'
    }));

})

server.listen(3333);