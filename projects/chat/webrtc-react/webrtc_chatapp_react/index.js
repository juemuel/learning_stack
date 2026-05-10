const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5001;
app.get("/", (req, res)=>{
    res.send('Server is runing');
})

io.on('connection', (socket)=>{
    // 发送me
    socket.emit('me',socket.id);

    // 监听disconnect
    socket.on('disconnect',()=>{
        // 发送callEnded
        socket.broadcast.emit("callEnded");
    });
    // 监听callUser
    socket.on('callUser',({userToCall, signalData,from,name})=>{
        // 发送callUser
        io.to(userToCall).emit("callUser",{signal:signalData,from,name});
    });
    // 监听answerCall
    socket.on("answerCall",(data)=>{
        // 发送callAccepted
        io.to(data.to).emit("callAccepted",data.signal);
    })
})

// 在服务端中，使用``时，可以在其中使用字面量；''不行
server.listen(PORT,()=>{console.log(`Server listening on port ${PORT}`)});

