
const {check , validationResult}=require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id , email:user.email},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const signup = [
    check("name")
    .trim()
    .isLength({min:2})
    .withMessage("Name should be atleast 2 character long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("first name should only contain alphabets"),

    check('email')
    .isEmail()
    .withMessage('pls enter a valid email')
    .normalizeEmail(),

    check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character')
    .trim(),
    

    check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),

   




    async (req, res) => {

      try{
        const { name, email, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({
            errors: errors.array().map(err => err.msg)
          });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
          return res.status(400).json({message:"user already exist"})
        }
      
        

        

          const hashedPassword = await bcrypt.hash(password,12);
          const user = new User({ name , email , password:hashedPassword});
          await user.save();
  
          res.status(201).json({
            message:"User created successfully"
          })

      }catch(err){
          console.log(err);
          res.status(500).json({
            message:"signup failed"
          })
        }
       
      
        
      }

]
module.exports = {signup,postLogin};

