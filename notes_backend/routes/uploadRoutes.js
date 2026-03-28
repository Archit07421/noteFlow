const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'upload/');

    },
    filename: function (req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    },
});

const upload = multer({storage})

router.post('/',upload.single('file'),(req,res)=>{
    try{
        res.json({
            message:"file uploaded successfully",
            fileUrl: `http://localhost:3000/upload/${req.file.filename}`,
            file:req.file,
        })
    }catch(error){
        res.status(500).json({error:'upload failed'});
    }
});

module.exports = router;