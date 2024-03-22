const express=require('express');
const app=express();
const  userSchema=require('../models/userSchema');
app.get('/register',(req,res)=>{
                res.send("registering")
})
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await userSchema.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await userSchema.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    

    // If the user does not exist, create a new user
    let user = await userSchema.create({ username, email, password });

      console.log(user);
    res.status(201).json({ status:true ,user });
  } catch (error) {
    // Handle error, send appropriate response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/login',async (req,res)=>{
      const {username,password}=req.body
      const user=await userSchema.findOne({username});
      console.log(user);
      if(!user){
        return res.json({msg:"user does not exist",status:false});
      }
      if(user.password!=password){
        return res.json({msg:"password not matched",status:false});
      }
      return res.json({msg:"login succesfuuly",status:true});
})
app.post("/setAvatar/:id", async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  try {
    // Find the user by ID
    const user = await userSchema.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's avatar image
    user.avatarImage = image;
    user.isAvatarImageSet = true; // You might want to set this to true

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: "Avatar updated successfully" ,status:true});
  } catch (error) {
    console.error("Error updating avatar:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/user', async (req, res, next) => {
  try {
    const { username } = req.body;

    // Find the user by username
    const existingUser = await userSchema.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ status: false, msg: 'User not found' });
    }

    // You can customize the response based on your requirements
    res.status(200).json({ status: true, msg: 'User found', user: existingUser });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

app.get('/allUsers', async (req, res) => {
  try {
    console.log("Fetching all users");
    const users = await userSchema.find({ isAvatarImageSet: true });
    // console.log(users);
    const simplifiedUsers = users.map(user => ({
      username: user.username,
      avatar: user.avatarImage,
      id:user._id
    }));
    // console.log(simplifiedUsers);
    res.json(simplifiedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  module.exports=app;