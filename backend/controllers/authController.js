const Users = require("../models/userModel");

// Send data in to database
exports.createUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


exports.loginUser = async (req, res, next)=>{

  try{
      const {email, password} = req.body;
      if(!email || !password){
     
          return res.status(400).json({
            success: false,
            message: "Email and password are required"
          })
      }

      // check user e-mail
      const user = await Users.findOne({email});
      if(!user){
         
          return res.status(400).json({
            success: false,
            message: "Invalid credentials"
          })
      }
      // check user passw
      const isMatched = await user.comparePassword(password);
      if (!isMatched){
        return res.status(400).json({
          success: false,
          message: "Invalid credentials"
        })
      }
      res.status(200).json({
        success: true,
        user
      })
  }
  catch(err){
      console.log(err);
     
      return res.status(400).json({
        success: false,
        message: "Can't log in, check your credentials"
      })
  }
 
}

