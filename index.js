var express= require("express");
var http=require("http");
var cors=require("cors");
var app=express();
var port=process.env.PORT || 5000;
var server=http.createServer(app);
var io=require("socket.io")(server,{
cors:{
    'orgin':"*"
}
});

//middle
app.use(express.json());
app.use(cors());
var client={};
io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id,'has joined')
    socket.on("signin",(id)=>{
        console.log(id);
        client[id]=socket;
        console.log(client);
    });
    socket.on("message",(msg)=>{
      console.log(msg);
    });
    socket.on("message",(msg)=>{
      let targetId=msg.targetId;
      if(client[targetId]) client[targetId].emit("message",msg);
      console.log("targetclient:",msg.targetId);
    });
});

app.route("/check").get((req,res)=>{
  return res.json("app is running");
});

server.listen(port,()=>{
    console.log("server started");
});
