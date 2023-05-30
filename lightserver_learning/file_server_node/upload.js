const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/upload/', upload.single('file'), (req, res) => {
    // console.log("detail",req.file, req.route, req.body)
    console.log(req);
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    if(req.file.path){
        // 这是upload file 的 path
        const oldPath = req.file.path;
        // 这是save file 的 path
        const newPath = path.join(__dirname, 'uploads', req.file.originalname);
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            console.log('File saved successfully');
        });
    }
    res.send('Upload successful');
});

app.listen(8989, function () {
    console.log("app is running at port 8989.");
});