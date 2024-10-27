const { generateClient } = require('@orbitor-io/cosmos-sdk');

async function getData() {
    const client = generateClient('');
    
    const url = client.generateUrl('', '');

    const res = await fetch('');
    const data = await res.json();

    return data;
}

console.log(getData());