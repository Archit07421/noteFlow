const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetchUser = require('./middleware/fetchUser');
require('dotenv').config();



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    console.log(req.method , req.url);
    next();
})



const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/api/auth',authRoutes);
app.use('/api',userRoutes);
app.use('/api',fetchUser,notesRoutes);


const PORT = 3000;
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongoDB");
    app.listen(PORT,()=>{
        console.log("the server started at port 3000");
    })
}).catch(err=>{
    console.log(err);
})