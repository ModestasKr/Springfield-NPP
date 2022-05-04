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
      
      // const token = await user.jwtGenerateToken();

      // res.status(200).json({
      //   success: true,
      //   token
      // })


      generateToken(user, 200, res);
  }
  catch(err){
      console.log(err);
     
      return res.status(400).json({
        success: false,
        message: "Can't log in, check your credentials"
      })
  }
 
}

const generateToken = async (user, statusCode, res) => {

  const token = await user.jwtGenerateToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.EXPIRE_TOKEN)
  };
  res
  .status(statusCode)
  .cookie("token", token, options)
  .json({
    success: true,
    token
  })
}

//Logout user

exports.logoutUser = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Atsijungta"
  })
}
