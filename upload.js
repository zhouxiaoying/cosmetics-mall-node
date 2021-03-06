var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './upload/'}).array('image'));

app.get('/upload.html', function (req, res) {
  res.sendFile( __dirname + "/" + "upload.html" );
})

app.post('/file_upload', function (req, res) {

  console.log(req.files[0]);  // 上传的文件信息

  var des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
    /*fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err );
      }else{
        response = {
          message:'File uploaded successfully',
          //filename:req.files[0].originalname
          filename:req.files[0].filename + "." + req.files[0].mimetype.split('/')[1]
        };
      }
      console.log( response );
      res.end( JSON.stringify( response ) );
    });*/
  });
})

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})