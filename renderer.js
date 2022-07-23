
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

var Ports;
var portselected;
var value;
var baudRates = [300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200]
let flagConnected;



async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if(err) {
     console.log('error');
      return
    } else {
    console.log('no error');
    }
    console.log('portas', ports);

    Ports = ports;

    if (Ports == undefined) {
        
    document.getElementById('ports-list').innerHTML = "Nenhum porta detectada"
    
    }else{
    
        updateList()

    }
    
});
    // if (ports.length === 0) {
    //     console.log(' No ports discovered');
    // }
    
}  



function updateList() {
    
    
    let portsList = document.getElementById('ports-list');
    let selectPort = document.getElementById('port-select')

    
    portsList.innerHTML = "";
    selectPort.innerHTML = "";

        Ports.forEach(e => {
            
         let lbl = document.createElement('label');

         lbl.innerHTML =  '<li> Nome: '+ e.friendlyName +'</li>';
         
         portsList.appendChild(lbl)


        /// ;  cria elemento option
        let opt = document.createElement("option");
        
        /// ; adiciona nome da cidade
        opt.innerHTML = e.path;
        
        /// ; adiciona opção no select
        selectPort.appendChild(opt);


            })
            
}




function connect() {
    
    let p = document.getElementById('port-select').value
    let baudRate = parseInt(document.getElementById('selbaudRate').value)

    portselected = new SerialPort({
        path: p,
        baudRate: baudRate,
        autoOpen: false,
    })
    
    portselected.open(function (err) {
        if (err) {
      return console.log('Error opening port: ', err.message)
    }
  
  })
  
  // The open event is always emitted
  portselected.on('open', function() {
      
      console.log('PORTA FOI ABERTA');

    flagConnected = true;
      
    })



}



function ReadData() {
    
    if (portselected.isOpen == true) {
    
    let parser = portselected.pipe(new ReadlineParser({ delimiter: '\r\n' }))
    parser.on('data', function (data) {
        
        value = data
    })
    }
    
}


function updateValue(params) {
    
    let e = document.getElementById('output')

    e.innerHTML = params

    // console.log('teste');

}

function updateStatus() {
    
    let e = document.getElementById('status')
    
    if (flagConnected == true) {
        
        if (portselected.isOpen == true) {
            
            e.innerHTML = "Conectado!"
        } else {
            
            flagConnected = false    
            e.innerHTML = "Desconectado!"
        }
            
        
    }

    // console.log('teste');

}





//// Call functions


document.getElementById('listports').addEventListener('click',listSerialPorts)

document.getElementById('connect').addEventListener('click',connect)

document.getElementById('start').addEventListener('click',ReadData)

var interval = setInterval(()=>{

    updateValue(value);

    
        updateStatus()


},200)

    