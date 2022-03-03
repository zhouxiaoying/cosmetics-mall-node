var fs = require('fs')
var multer = require("multer");
var dest = './upload'
var upload = multer({ dest: dest })

router.post('/file_upload', upload.array('images', 12), function(req, res, next) {
    var files = req.files
    var dir = req.body.dirname
    for(var i = 0; i < files.length; i++) {
        var file = files[i]
        fs.renameSync(file.destination+'/'+ file.filename, file.destination+'/'+dir+'/'+ file.originalname);
    }
    res.json({
        code: 1000,
        desc: '成功导入'+files.length+ '张图片'
    });
});
