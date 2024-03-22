const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose');
const socket = require("socket.io");

app.use(cors());
app.use(express.json())
const server=app.listen(8000,()=>{
    console.log(`server started at ${3000}`)
})
const userSchema=require('./models/userSchema');
const MessageSchema=require('./models/messageModel')
const authroutes=require('./routes/auth');
const messageroute=require('./routes/message')
app.use(authroutes);

app.use(messageroute);

mongoose.connect('mongodb://127.0.0.1:27017/chat-app')
.then(()=>{
    console.log('DB connected');
})
.catch(()=>{
    console.log('Something went Wrong') ;
})
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
