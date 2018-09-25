const net = require('net');
const fs = require('fs');
const port = 8003;
let qa;
let current_question = 0;

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, ()=> {
    fs.readFile('qa.json', 'utf8', (err, data)=> {
        if(err){
            console.log(e);
        }else{
            qa = shuffle(JSON.parse(data));
            send_request('QA');
        }
    });
});

client.on('data', (data)=>{
    console.log('Server: ' + data);
    if(data === 'DEC') {
        client.destroy();
    }else{
        if(data == 'ACK'){
            generate_question();
        }else{
            check_answer(data);
            generate_question();
        }
    }
});

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.ceil(Math.random() * (i+1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}