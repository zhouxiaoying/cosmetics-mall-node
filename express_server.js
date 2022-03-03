const http=require('http');
var express = require('express');
var ejs = require('ejs');
var router = express.Router();
const url=require('url');
const zlib=require('zlib');
const crypto=require('crypto');
const uuid = require('uuid');
var app = express();
const mysql=require('mysql');
var fs = require("fs");
let db=mysql.createPool({host: '47.98.133.20', port: 3306, user: 'aliyun_user', password: '123qwe123', database: 'mall'});
var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('www'));
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './www/upload/'}).array('path','alter_path'));



app.use('/reg',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  //校验
  if(!userName){
    res.write('{"err": 1, "msg": "username can\'t be null"}');
    res.end();
  }else if(!password){
    res.write('{"err": 1, "msg": "password can\'t be null"}');
    res.end();
  }else{
    db.query(`SELECT * FROM mall_user WHERE userName='${userName}'`, (err, data)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else if(data.length>0){
      res.write('{"err": 1, "msg": "this username exsits"}');
      res.end();
    }else{
      let uuid1 = uuid.v4().replace(/\-/g,'');
      db.query(`INSERT INTO mall_user (id,userName,password,name,phone,sex,role) VALUES('${uuid1}','${userName}','${password}','${name}','${phone}','${gender}','0')`, (err, data)=>{
        if(err){
          res.write('{"err": 1, "msg": "database error"}');
          res.end();
        }else{
          res.write('{"err": 0, "msg": "success"}');
      res.end();
    }
    });
    }
  });
  }
});


app.use('/login',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  //校验
  if(!userName){
    res.write('{"err": 1, "msg": "username can\'t be null"}');
    res.end();
  }else if(!password){
    res.write('{"err": 1, "msg": "password can\'t be null"}');
    res.end();
  }else{
    var loginsql = "SELECT * FROM mall_user WHERE 1 = 1";
    loginsql += " and userName='" + userName + "'";
    console.log(loginsql);
    db.query(loginsql, (err, data)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else if(data.length==0){
      res.write('{"err": 1, "msg": "no this user"}');
      res.end();
    }else if(data[0].password != password){
      res.write('{"err": 1, "msg": "username or password is incorrect"}');
      res.end();
    }else{
      res.write('{"err": 0, "msg": "success"}');
      res.end();
    }
  });
  }
});



app.use('/user',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  var querysql = `SELECT * FROM mall_user WHERE 1=1 `;
  db.query(querysql, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      let data1 = JSON.stringify(data);
  res.write(data1);
  //res.json({code: 200, message: "get gg_account list success", data: data});
  res.end();

}
});
});

app.use('/addUser',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  //校验
  if(!userName){
    res.write('{"err": 1, "msg": "username can\'t be null"}');
    res.end();
  }else if(!password){
    res.write('{"err": 1, "msg": "password can\'t be null"}');
    res.end();
  }else{
    db.query(`SELECT * FROM mall_user WHERE userName='${userName}'`, (err, data)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else if(data.length>0){
      res.write('{"err": 1, "msg": "this username exsits"}');
      res.end();
    }else{
      let uuid1 = uuid.v4().replace(/\-/g,'');
      db.query(`INSERT INTO mall_user (id,userName,password,name,phone,sex,role) VALUES('${uuid1}','${userName}','${password}','${name}','${phone}','${gender}','${role}')`, (err, data)=>{
        if(err){
          res.write('{"err": 1, "msg": "database error"}');
          res.end();
        }else{
          res.write('{"err": 0, "msg": "success"}');
      res.end();
    }
    });
    }
  });
  }
});

app.use('/delUser',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  db.query(`DELETE FROM mall_user WHERE id = '${id}'`, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      res.write('{"err": 0, "msg": "success"}');
  res.end();
}
});
});


app.use('/alterUser',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  db.query(`SELECT * FROM mall_user WHERE id = '${id}'`, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      let data1 = JSON.stringify(data);
  res.write(data1);
  res.end();
}
});
});



app.use('/alterUserSave',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  var updateTime = new Date().toLocaleString();
  var updateSql = "UPDATE mall_user SET ";
  updateSql += "updateTime='" + updateTime+"'";
  if(userName == '' || userName == null){
    userName = "";
  }
  updateSql += ",userName='" + userName+"'";
  if(name == '' || name == null){
    name = "";
  }
  updateSql += ",name='" + name+"'";
  if(password == '' || password == null){
    password = "";
  }
  updateSql += ",password='" + password+"'";
  if(gender == '' || gender == null){
    gender = "";
  }
  updateSql += ",sex='" + gender+"'";
  if(phone == '' || phone == null){
    phone = "";
  }
  updateSql += ",phone='" + phone+"'";
  updateSql += " where id='" + id+"'";
  db.query(updateSql, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      res.write('{"err": 0, "msg": "success"}');
  res.end();
}
});
});



app.use('/type',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  var querysql = "SELECT * FROM mall_type WHERE 1=1 ";
  if(level != '' && level != null){
    querysql += " and level='" + level + "'";
  }else{
    querysql += " and level= '1'";
  }
  if(parent_id != '' && parent_id != null){
    querysql += " and parent_id='" + parent_id + "'";
  }
  db.query(querysql, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    } else{
      let data1 = JSON.stringify(data);
  res.write(data1);
  res.end();
}
});
});


app.use('/addType',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  //校验
  if(!name){
    res.write('{"err": 1, "msg": "name can\'t be null"}');
    res.end();
  }else{
    db.query(`SELECT * FROM mall_type WHERE name='${name}'`, (err, data)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else if(data.length>0){
      res.write('{"err": 1, "msg": "this name exsits"}');
      res.end();
    }else{
      let uuid1 = uuid.v4().replace(/\-/g,'');
      db.query(`INSERT INTO mall_type (id,name,status,level) VALUES('${uuid1}','${name}','0','1')`, (err, data)=>{
        if(err){
          res.write('{"err": 1, "msg": "database error"}');
          res.end();
        }else{
          res.write('{"err": 0, "msg": "success"}');
      res.end();
    }
    });
    }
  });
  }

});




app.use('/addChildType',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;

  //校验
  if(!name){
    res.write('{"err": 1, "msg": "name can\'t be null"}');
    res.end();
  }else{
    db.query(`SELECT * FROM mall_type WHERE name='${name}'`, (err, data)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else if(data.length>0){
      res.write('{"err": 1, "msg": "this name exsits"}');
      res.end();
    }else{
      let uuid1 = uuid.v4().replace(/\-/g,'');
      db.query(`INSERT INTO mall_type (id,name,status,level,parent_id) VALUES('${uuid1}','${name}','0','2','${parent_id}')`, (err, data)=>{
        if(err){
          res.write('{"err": 1, "msg": "database error"}');
          res.end();
        }else{
          res.write('{"err": 0, "msg": "success"}');
      res.end();
    }
    });
    }
  });
  }

});





app.use('/delType',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  db.query(`DELETE FROM mall_type WHERE id = '${id}'`, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      res.write('{"err": 0, "msg": "success"}');
  res.end();
}
});


});



app.use('/alterType',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  db.query(`SELECT * FROM mall_type WHERE id = '${id}'`, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      let data1 = JSON.stringify(data);
  res.write(data1);
  res.end();
}
});
});





app.use('/alterTypeSave',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;
  var updateTime = new Date().toLocaleString();
  var updateSql = "UPDATE mall_type SET ";
  updateSql += "updateTime='" + updateTime+"'";
  if(name != '' && name != null){
    updateSql += ",name='" + name+"'";
  }

  if(status != '' && status != null){
    updateSql += ",status='" + status+"'";
  }

  updateSql += " where id='" + id+"'";
  db.query(updateSql, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      res.write('{"err": 0, "msg": "success"}');
  res.end();
}
});
});


app.use('/product',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  var querySql = "select g.id,g.name,g.price,g.amount,g.typeId,g.path,g.content,g.status,t.parent_id,t.name as typeName  ";
  querySql += " from mall_goods g ";
  querySql += " left join mall_type t on t.id = g.typeId ";
  querySql += " where 1=1 ";
  db.query(querySql, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    } else{
      let data1 = JSON.stringify(data);
  res.write(data1);
  res.end();
}
});


});


app.get('/upload.html', function (req, res) {
  res.sendFile( __dirname + "/" + "upload.html" );
});


app.use('/addProduct',function(req,res){
  var des_file = __dirname + "/" + req.files[0].originalname;
  let arr=[];
  arr.push(req.files[0].originalname);
  arr.push(req.files[0].filename);
  arr.push(req.files[0].mimetype.split('/')[1]);
  var path = '/upload/'+req.files[0].filename +'.'+req.files[0].mimetype.split('/')[1];
  fs.renameSync('./www/upload/' + req.files[0].filename,"./www" + path);
  let uuid1 = uuid.v4().replace(/\-/g,'');
  let goodsName = req.body.name;
  let price = req.body.price;
  let amount = req.body.amount;
  let typeId = req.body.typeId;
  let content = req.body.content;
  let status = "0";

  let sql=`INSERT INTO mall_goods (id,name,price,amount,path,typeId,content,status) `;
  sql += `VALUES ('${uuid1}','${goodsName}','${price}','${amount}','${path}','${typeId}','${content}','${status}')`;
  db.query(sql, (err)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      res.write('{"err": 0, "msg": "success"}');
  res.end();
}
});
});



app.use('/alterProduct',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {id}=query;
  var querySql = "select g.id,g.name,g.price,g.amount,g.typeId,g.path,g.content,g.status,t.parent_id,t.name as typeName  ";
  querySql += " from mall_goods g ";
  querySql += " left join mall_type t on t.id = g.typeId ";
  querySql += " where g.id = '" + id + "'";

  db.query(querySql, (err, data)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      let data1 = JSON.stringify(data);
  res.write(data1);
  res.end();
}
});
});

app.use('/deleteProFile',function(req,res){
  let {pathname, query}=url.parse(req.url, true);
  let {id,filePath}=query;
  // 删除文件
  fs.unlinkSync("./www" + filePath);
  var updateSql = "update mall_goods set path = '' ";
  updateSql += " where id = '" + id + "'";
  db.query(updateSql, (err)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      res.write('{"err": 0, "msg": "success"}');
  res.end();
}
});
});

app.use('/toAlterProduct',function(req,res){
  var des_file = __dirname + "/" + req.files[0].originalname;
  let arr=[];
  arr.push(req.files[0].originalname);
  arr.push(req.files[0].filename);
  arr.push(req.files[0].mimetype.split('/')[1]);
  var path = '/upload/'+req.files[0].filename +'.'+req.files[0].mimetype.split('/')[1];
  console.log(path);
  fs.renameSync('./www/upload/' + req.files[0].filename,"./www" + path);
  let uuid1 = uuid.v4().replace(/\-/g,'');
  let id = req.body.id;
  let goodsName = req.body.alter_name;
  let price = req.body.alter_price;
  let amount = req.body.alter_amount;
  let typeId = req.body.alter_typeId;
  let content = req.body.alter_content;
  let status = "0";

  let updateSql=`update mall_goods set `;
  updateSql += " name = '" + goodsName + "'";
  updateSql += " price = '" + price + "'";
  updateSql += " amount = '" + amount + "'";
  updateSql += " path = '" + path + "'";
  updateSql += " typeId = '" + typeId + "'";
  updateSql += " content = '" + content + "'";
  updateSql += " status = '0'";
  updateSql += " where id = '" + id + "'";

  db.query(updateSql, (err)=>{
    if(err){
      res.write('{"err": 1, "msg": "database error"}');
      res.end();
    }else{
      res.write('{"err": 0, "msg": "success"}');
  res.end();
}
});
});


















app.use('/cart', function(req, res) {
  fs.readFile("./www/cart.ejs",function(err,data){
    var template1=data.toString();
    var result = new Array();
    var m = new Map();
    var querystr = req.query.val;
    var querystrarr = querystr.split(',');
    querystrarr.splice(querystrarr.length-1,1);
    var ids = "(";
    for(var i = 0;i<querystrarr.length;i++){
      var temparr = querystrarr[i].split('-');
      var id = temparr[0];
      var num = temparr[1];
      if(m[id] == null){
        m[id] = parseInt(num);
      }else{
        m[id] = m[id] + parseInt(num);
      }
      if(i == querystrarr.length - 1){
        ids += "'" + id + "'";
      }else{
        ids += "'" + id + "',";
      }
    }
    ids += ")";
    //从数据库查询  status为0的商品
    var data3 = {};
    db.query(`SELECT * FROM mall_goods WHERE status = 1 and id in ` + ids , (err, data1)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else{
        for(var j = 0 ; j < data1.length ; j++){
      var da = data1[j];
      da.num = m[da.id];
    }
    data3.rows = data1;
    console.log(data3);
    var html=ejs.render(template1,data3);
    res.writeHead(200,{"content-type":"text/html"});
    res.end(html);
  }
  });

  })


});



app.use('/mine', function(req, res) {
  var userName = req.query.userName;
  fs.readFile("./www/mine.ejs",function(err,data){
    var template1=data.toString();
    //从数据库查询  status为0的商品
    var data3 = {};
    db.query(`SELECT * FROM mall_order WHERE status != 2 AND userName = '` +userName + "'", (err, data1)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else{
        //console.log(data1);
        if(data1.length > 0){
      for(var j = 0 ; j < data1.length ; j++){
        var da = data1[j];
        var orderId = da.id;
        console.log(orderId)
        db.query(`SELECT * FROM mall_order_goods WHERE orderId = '` +orderId + "'", (err, data4)=>{
          if(err){
          }else{
            console.log(data4);
        data1[j].goods =data4;
      }
      })
      }
    }
    data3.rows = data1;
    console.log(data3);
    var html=ejs.render(template1,data3);
    res.writeHead(200,{"content-type":"text/html"});
    res.end(html);
  }
  });

  })


});







app.use('/orderSave', function(req, res) {
  console.log(req.query);
  var userName = req.query.userName;
  var totalPrice = req.query.totalPrice;
  var orderStr = req.query.orderStr;

  let uuid1 = uuid.v4().replace(/\-/g,'');
  let createTime = new Date().toLocaleString();
  var saveOrder = `insert into mall_order (id,totalPrice,userName,status,createTime) values(`;
  saveOrder += "'" + uuid1 + "','" + totalPrice + "','" + userName + "','1','" + createTime + "')";
  db.query(saveOrder, (err)=>{
    if(err){
      /*res.write('{"err": 1, "msg": "database error"}');
       res.end();*/
    }else{
      /*res.write('{"err": 0, "msg": "success"}');
       res.end();*/
    }
  });

  var orderList = orderStr.split(",");
  if(orderList.length > 0){
    orderList.splice(orderList.length-1,1);
    for(var i = 0 ; i < orderList.length ; i++){
      var or = orderList[i];
      var ors = or.split("-");
      let uuid2 = uuid.v4().replace(/\-/g,'');
      var saveOrderGood = `insert into mall_order_goods (id,orderId,goodId,amount,price) values(`;
      saveOrderGood += "'" + uuid2 + "','" + uuid1 + "','" + ors[0] + "','" + ors[2] + "','" + ors[1] + "')";
      db.query(saveOrderGood, (err)=>{
        if(err){
          /*  res.write('{"err": 1, "msg": "database error"}');
           res.end();*/
        }else{
          /* res.write('{"err": 0, "msg": "success"}');
           res.end();*/
        }
      });
    }

  }
  res.write('{"err": 0, "msg": "success"}');
  res.end();
});







app.use('/detail', function(req, res) {
  fs.readFile("./www/detail.ejs",function(err,data){
    var template1=data.toString();
    //从数据库查询  status为0的商品
    var data3 = {};
    db.query(`SELECT * FROM mall_goods WHERE status = 1`, (err, data1)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else{
        //console.log(data1);
        data3.rows = data1;
    var html=ejs.render(template1,data3);
    res.writeHead(200,{"content-type":"text/html"});
    res.end(html);
  }
  });

  })


});




app.use('/brandstory', function(req, res) {
  fs.readFile("./www/brandstory.ejs",function(err,data){
    var template1=data.toString();
    //从数据库查询  status为0的商品
    var data3 = {};
    db.query(`SELECT * FROM mall_goods WHERE status = 1`, (err, data1)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else{
        //console.log(data1);
        data3.rows = data1;
    var html=ejs.render(template1,data3);
    res.writeHead(200,{"content-type":"text/html"});
    res.end(html);
  }
  });

  })


});




app.use('/changegifts', function(req, res) {
  fs.readFile("./www/changegifts.ejs",function(err,data){
    var template1=data.toString();
    //从数据库查询  status为0的商品
    var data3 = {};
    db.query(`SELECT * FROM mall_goods WHERE status = 1`, (err, data1)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else{
        //console.log(data1);
        data3.rows = data1;
    var html=ejs.render(template1,data3);
    res.writeHead(200,{"content-type":"text/html"});
    res.end(html);
  }
  });

  })


});



app.use('/allProducts', function(req, res) {
  fs.readFile("./www/allProducts.ejs",function(err,data){
    var template1=data.toString();
    //从数据库查询  status为0的商品
    var data3 = {};
    db.query(`SELECT * FROM mall_goods WHERE status = 1`, (err, data1)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else{
        //console.log(data1);
        data3.rows = data1;
    var html=ejs.render(template1,data3);
    res.writeHead(200,{"content-type":"text/html"});
    res.end(html);
  }
  });

  })


});




app.use('/', function(req, res) {
  fs.readFile("./www/index.ejs",function(err,data){
    var template=data.toString();
    //从数据库查询  status为0的商品
    var data2 = {};
    db.query(`SELECT * FROM mall_goods WHERE status = 1`, (err, data1)=>{
      if(err){
        res.write('{"err": 1, "msg": "database error"}');
        res.end();
      }else{
        //console.log(data1);
        data2.rows = data1;
    var html=ejs.render(template,data2);
    res.writeHead(200,{"content-type":"text/html"});
    res.write(html);
    res.end();
  }
  });

  })

});





//module.exports = router;















app.post('/file_upload', function (req, res) {
  var des_file = __dirname + "/" + req.files[0].originalname;
  let arr=[];
  arr.push(req.files[0].originalname);
  arr.push(req.files[0].filename);
  arr.push(req.files[0].mimetype.split('/')[1]);
  console.log(arr);
  var path = '/upload/'+req.files[0].filename +'.'+req.files[0].mimetype.split('/')[1];
  fs.renameSync('./www/upload/' + req.files[0].filename,"./www" + path);
  var id = "1";
  let sql=`INSERT INTO mall_goods (path,id) VALUES ('${path}','${id}')`;
  db.query(sql, (err)=>{
    if(err){
      console.log(err);
      res.send('不OK');
    }else{
      res.send("OK");
}
});

  //fs.unlinkSync('./www/upload/96920d7258da1f6c9e7ec97eede871fe.png');  //删除文件

  /*fs.readFile( req.files[0].path, function (err, data) {
   fs.writeFile(des_file, data, function (err) {
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
   });
   });*/
})

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})