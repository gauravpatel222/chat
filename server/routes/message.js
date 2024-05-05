    const express=require('express')
    const app=express();
    const MessageSchema=require('../models/messageModel')
    const userSchema=require('../models/userSchema');
    app.post('/allmessage',async (req,res)=>{
            const {from,to}=req.body;
            // console.log(to);
            const message=await MessageSchema.find({
                users: {
                $all: [from, to],
                },
            }).sort({ updatedAt: 1 });
            const allmessages=await message.map((msg)=>{
                // console.log(msg.sender+"  "+from)
                        return {
                            
                            fromSelf:msg.sender.toString()===from,
                            message:msg.message.text
                        }

            })
        

    })
    app.post('/addmessage',async (req,res)=>{
        const {from,to,msg}=req.body;
    const data= await MessageSchema.create({
            message:{text:msg},
            users:[from,to],
            sender:from
        })
        if(data){
            return  res.json({msg:"added succesfully"});
        }

        
    })
    app.get('/logout/:id', (req, res, next) => {
        try {
          if (!req.params.id) return res.json({ msg: "User id is required " });
          onlineUsers.delete(req.params.id);
          return res.status(200).send();
        } catch (ex) {
          next(ex);
        }
      });
      
    module.exports=app;