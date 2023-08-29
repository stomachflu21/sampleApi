const express = require('express')
const app = express()
const port = 3000;
const fs = require('fs')
var bodyParser = require('body-parser')
var cors = require('cors')
//const jwt = require('jsonwebtoken');
const { xss } = require('express-xss-sanitizer');
//const { ExpressPeerServer } = require('peer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xss());
app.use(cors());


var https = require('http').createServer(app);
https.listen(port)


//API(s)
var routes = require('./routes/routes');
routes(app, https);

//SOCKET APIs
// var socketManager = require('./controller/socketManager.js')
// socketManager(io);


console.log('API server started on: ' + port);


// global.Groups = [];
// global.Rooms = [];
// global.Viewers = [];

//Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/stagingji.net/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/stagingji.net/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/stagingji.net/chain.pem', 'utf8');

// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// };

//var https = require('https').Server(credentials, app)

// var https = require('https').createServer(credentials,app);
// https.listen(port)

// const io = require('socket.io')(https, {
//     cors: {
//         origin: "*",
//     }
// });

// const peerServer = ExpressPeerServer(https, {
//     debug: true,
//     ssl:{
//         key: credentials.key,
//         certificate: credentials.cert
//     },
//     port: 3000,
// });

//app.use('/peerjs',peerServer);


//var http = require('http').Server(app);
//const io = require('socket.io')(http);

//API(s)
// var routes = require('./routes/routes');
// routes(app, https);

//SOCKET APIs
// var socketManager = require('./controller/socketManager.js')
// socketManager(io);

// var autoRuns = require('./controller/autoRuns.js');
// autoRuns();

//const server = https.listen(port);


// const peerServer = ExpressPeerServer(server, {
//     path: '/babyMonitoring',
//     ssl: {
//         key: fs.readFileSync('/etc/letsencrypt/live/stagingji.net/privkey.pem', 'utf8'),
//         cert: fs.readFileSync('/etc/letsencrypt/live/stagingji.net/cert.pem', 'utf8')
//       }
// });
   



//cluster mmultithreading ------------------------------------------------------------------------------------
//var cluster = require('cluster');
//const cpus = require('os').cpus
//import { cpus } from 'os';
//const process = require('process');
//const { Http2ServerResponse } = require('http2');
//import process from 'process';

//const numOfCPUs = cpus().length;

// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);


//     //console.log(`Primary ${process.pid} is running`);
//     // Fork workers.
//     for (let i = 0; i < numOfCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     });


// }
// else {
    
//     //open server
//     https.listen(port);
//     //console.log(`Worker ${process.pid} started`);
//     //http.listen(port);
//     console.log('API server started on: ' + port);
// }







