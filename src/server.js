import http from 'node:http';

// GET => Buscar um recurso do backend
// POST => Criar um recurso no backend
// PUT => Atualizar um recurso no backend
// PATCH => Atualizar uma informação específica de um recurso no backend
// DELETE => Deletar um recurso no backend

// stateful - stateful é quando o servidor guarda o estado do usuário
// stateless - stateless é quando o servidor não guarda o estado do usuário

const users = [];
import { randomUUID } from 'node:crypto';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }


    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body
       
        users.push({
            id: randomUUID(),
            name,
            email,
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end(JSON.stringify({
        message: 'Not Found'
    }));

})

server.listen(3333);