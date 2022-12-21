// import required Packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
// const fileupload = require("express-fileupload");


const io = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');


const playerRoute = require('./App/routes/PlayerRoutes');
const organizerRoute = require('./App/routes/OrganizerRoutes');
const adminRoute = require('./App/routes/adminRoutes');
const offerRoutes = require('./App/routes/OfferRoutes');
const transitionRoute = require('./App/routes/TransitionRoute')
const gameRoutes = require('./App/routes/GameRoutes');
const competitionRoute = require('./App/routes/competitionRoutes');
const authRoutes = require('./App/routes/authRoutes');
const communityRoute = require('./App/routes/CommunityRoute');




// Init Packages
const app = express();
dotenv.config();


// Init Packages Middlewares
// app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
var corsOptions = {
    origin: ['https://egorgaming.com', 'http://localhost:3000', 'http://138.68.67.137'],
    credentials : true
}
app.use(cors(corsOptions));
// app.use(cors());
 app.enable('trust proxy')
// app.options('*', cors())
app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'https://egorgaming.com');
    res.setHeader('Access-Control-Allow-Origin', 'http://138.68.67.137');
//  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'X-HTTP-Method-Override', 'X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// set up the socket



app.get('/test', (req, res) => {
    res.json('jkhg')
})

// Routing
app.use('/api/player', playerRoute);
app.use('/api/organizer', organizerRoute);
app.use('/api/admin', adminRoute);
app.use('/api/offer', offerRoutes);
app.use('/api/transition', transitionRoute);
app.use('/api/game', gameRoutes);
app.use('/api/competition', competitionRoute);
app.use('/api/community', communityRoute);
app.use('/api/', authRoutes);



// Server Run
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, (req,res)=>{
    console.log(`Backend running on port : ${PORT}.....`);
});



process.on('SIGTERM', () => {
    console.log('SIGTERM recieved');
    server.close(() => {
      console.log('Process terminated')
    })
  })

const socket_server = io(server, { 
    cors: {
        origin: "*",
      }
})

instrument(socket_server, {auth: false});
socket_server.on('connection', (socket) => {

    socket.on('send_msg', (data) => {
        socket.to(data.room).emit('receive_msg', data);
    });

    socket.on("join_room", (username, room) => {
        socket.name = username;
        socket.join(room);
    });

    socket.on('disconnect', function(){
        console.log(`disconnection ${socket.id}`);
    });
 
    socket.on('error', function(e){
        console.log(e);
    });
});
