// https://serialport.io/docs/api-serialport

const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 115200
});
const parser = new Readline()
port.pipe(parser);

// Open errors will be emitted as an error event
parser.on('data', function(data) {
  console.log('Data: ', data.toString('utf8'))
})