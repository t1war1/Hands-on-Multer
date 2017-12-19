const express= require('express');
const path=require('path');
const app=express();
const multer=require('multer');

//provides privileges to store on disk.
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads')  //destination for files to upload
    },
    filename: function(req, file, cb) {  //naming the downloaded file
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname +file.originalname +'.' +extension)
    }
})
const upload = multer({ storage: storage })

app.get('/',(req,res)=>{
    // res.send(`Hello ${req.query.username}`);
    res.status(404).send('Somehting broke')
});

app.post('/profile',upload.any(),function (req,res,next) {
   res.send("file uploaded");  //response when file is uploaded

})

// app.get('/:users',(req,res)=>{
//     res.download(path.join(__dirname,'ej.java'),'slide.java',(err)=>{
//         if(err)
//         console.log("Error downloading file");
//         else
//             console.log("Success")
//     });
// })

app.get('/uploadfile',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'));
})


app.listen(2345,()=>{
    console.log("Server at http://localhost:2345/");
})
