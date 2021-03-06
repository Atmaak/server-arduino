var serialport = require('serialport');
const express = require('express');
var cors = require('cors')
const app = express()
const potr = 3000

app.use(cors())
var stupne = 0;
var vlhkost = 0;

var port = new serialport('COM3', {
    baudRate: 500000
});

port.on('open', onOpen);
port.on('data', onData);
function onOpen() {
    //console.log('opened')
}
async function onData(data) {
    /*console.log(data)
    console.log(data.toString())*/
    data = data.toString();


    if(data.includes('stupne')){
        stupne = data.toString();
        //console.log('stupne')
    }
    if(data.includes('vlhkost')){
        vlhkost = data.toString();
        //console.log('vlhkost')
    }
}


app.listen(potr, () => {
  console.log('Started')
})
app.get('/', (req, res) => {
    if (typeof stupne === 'undefined' || stupne === null || typeof vlhkost === 'undefined' || vlhkost === null) {
        throw error
    }

    res.send(`
    {
        ${stupne},
        ${vlhkost}
    }
    
    `)
  })