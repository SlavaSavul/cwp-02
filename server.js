// server.js
const net = require('net');
const fs = require('fs');
const port = 8003;
let seed = 0;


const server = net.createServer((client) => {
    client.setEncoding('utf8');
    client.id = Date.now() +"_seed"+ ++seed;
    client.logger = fs.createWriteStream(`client${client.id}.txt`);

    client.on('data', (data)=>{
        Log(client, 'Client:'+ data);
        if(data === 'QA') {
            send_response(client, 'ACK');
        }else{
            send_answer(client, data);
        }
    });
    client.on('end', () => Log(client, `Client №${client.id} disconnected`));
});

function send_answer(client, message){
    if(/q:.*/.test(message)){
        let rand = Math.random() * (3);
        rand = Math.ceil(rand);
        send_response(client, rand.toString());
    }
}

function send_response(client, message){
    Log(client, 'You: ' + message);
    client.write(message);
}

function Log(client, message){
    client.logger.write(message+'\n');
    console.log('You: ' + message);
}

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});