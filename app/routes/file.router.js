var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var XLSX = require('xlsx');
var multer = require('multer');
const router = require('express').Router();
var excelSchema = require("../models/user.model")

// multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });


//init app
var app = express();

//set the template engine
app.set('view engine', 'ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

//static folder path
app.use(express.static(path.resolve(__dirname, 'public')));



// var excelModel = mongoose.model('excelData', excelSchema);


app.get('/file', (req, res) => {
    excelModel.find((err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data != '') {
                res.render('home', { result: data });
            } else {
                res.render('home', { result: {} });
            }
        }
    });
});

app.post('/file', upload.single('excel'), (req, res) => {
    var workbook = XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x = 0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        excelModel.insertMany(xlData, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
        x++;
    });
    res.redirect('/');
});


module.exports = router;