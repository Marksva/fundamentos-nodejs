import { Readable, Writable, Transform } from 'node:stream';


class OneToHundredStream extends Readable {
    index = 1; 

    _read() {
        const i = this.index++; 

        setTimeout(() =>{
            if (i > 100) {
                this.push(null); // Signal the end of the stream
            } else {
                const buf = Buffer.from(String(i)); // Convert number to Buffer
                this.push(buf); // Push the buffer to the stream
            }
        }, 1000)

    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1; // Inverse the number

        const buf = Buffer.from(String(transformed)); // Convert back to Buffer

        callback(null, buf); // Pass the transformed buffer to the next stream
    }
}


class MultiplyByTenStream extends Writable {

    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10 );
        callback(); // Signal that the write is complete
    }

}


new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());