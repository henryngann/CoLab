import io from 'socket.io-client';
require('dotenv').config()

const ENDPOINT = 'http://localhost:3001/';

function Socket() {
  this.socket = io(ENDPOINT);
};

const sckt = new Socket();

export { sckt };