import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

// req => ReadableStream
// res => WritableStream
// buffers => o buffer é um espaço de memória que armazena os dados temporariamente
// TransformStream => é um tipo de stream que transforma os dados que estão sendo lidos
// os chunks sao os pedaços de dados que estão sendo lidos do stream
// vamos utilizar chunks e streams para ler dados que não cabem na memória de uma vez só
// como por exemplo um arquivo muito grande ou uma requisição muito grande
// musicas ou videos que são muito grandes
// o stream é uma forma de ler e escrever dados de forma eficiente, sem precisar carregar tudo

const server = http.createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)
})

server.listen(3334)