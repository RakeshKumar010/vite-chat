const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const cors = require('cors')
app.use(cors())
const PORT = 5000;
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['post','get']
    },
});
let user=0;
io.on('connection',(socket)=>{
    user++
    console.log(`${socket.id} is connected`)
    socket.emit('newuserconnected','hello,Welcome')
    socket.broadcast.emit('newuserconnected',`${user} connection`)
    socket.on('send_message',(data)=>[
        socket.emit('receive_message',data)
    ])
    socket.on('disconnect',()=>{
        user--
    socket.broadcast.emit('newuserconnected',`${user} connection`)

        console.log(`${socket.id} is disconnected`)
    })
})
server.listen(PORT,()=>{
    console.log(`Server is opne at localhost:${PORT}`);
})


