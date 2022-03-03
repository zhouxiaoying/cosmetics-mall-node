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
var async  = require('async');
const stringRandom = require('string-random');

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
    let {firstType,secondType}=query;
    var querySql = "select g.id,g.name,g.price,g.amount,g.typeId,g.path,g.content,g.status,t.parent_id,t.name as typeName,  ";
    querySql += " ifnull((select count(gr.id) from mall_goods_recommend gr where gr.goodId = g.id ),0) as recommendCount, ";
    querySql += " ifnull((select count(gr.id) from mall_goods_index gr where gr.goodId = g.id ),0) as indexCount, ";
    querySql += " ifnull((select count(gr.id) from mall_integral_goods gr where gr.goodId = g.id ),0) as integralCount ";
    querySql += " from mall_goods g ";
    querySql += " left join mall_type t on t.id = g.typeId ";
    querySql += " where 1=1 ";
    if(firstType != '' && firstType != null){
        querySql += " and (t.id = '" + firstType +  "' or t.parent_id = '" + firstType + "')";
        if(secondType != '' && secondType != null){
            querySql += " and t.id = '" + secondType + "'";
        }
    }
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

app.use('/creditProduct',function(req,res){
    let {pathname, query}=url.parse(req.url, true);
    let {firstType,secondType}=query;
    var querySql = "select g.id,g.name,g.price,g.amount as goodAmount,g.typeId,g.path,g.content,g.status,t.parent_id,t.name as typeName,ig.amount,ig.integralCount,ig.id as relationId ";
    querySql += " from mall_integral_goods ig ";
    querySql += " left join mall_goods g on g.id = ig.goodId ";
    querySql += " left join mall_type t on t.id = g.typeId ";
    querySql += " where 1=1 order by ig.createTime desc ";

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

app.use('/creditDown',function(req,res){
    let {pathname, query}=url.parse(req.url, true);
    let {firstType,secondType}=query;
    var querySql = "select g.name,t.name as typeName,io.id as relationId,ir.count,mu.name as userName,io.createTime  ";
    querySql += " from mall_integral_order io ";
    querySql += " left join mall_integral_record ir on ir.id = io.recordId ";
    querySql += " left join mall_goods g on g.id = io.integralId ";
    querySql += " left join mall_type t on t.id = g.typeId ";
    querySql += " left join mall_user mu on io.userName = mu.userName ";
    querySql += " where 1=1 order by io.createTime desc ";
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

app.use('/queryOrderList',function(req,res){
    let {pathname, query}=url.parse(req.url, true);
    var querySql = "select o.id,o.orderNo,o.totalPrice,o.status,o.createTime,mu.name as userName ";
    querySql += " from mall_order o ";
    querySql += " left join mall_user mu on o.userName = mu.userName ";
    querySql += " where 1=1 and o.status != '3' order by o.createTime desc ";
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

app.use('/queryOrderGoodsList',function(req,res){
    let {pathname, query}=url.parse(req.url, true);
    let orderId = req.query.orderId;

    var querySql = "select mg.name,o.amount,o.price,mg.name as typeName ";
    querySql += " from mall_order_goods o ";
    querySql += " left join mall_goods mg on mg.id = o.goodId ";
    querySql += " left join mall_type t on mg.typeId = t.id ";
    querySql += " where o.orderId = ? ";
    db.query(querySql,orderId, (err, data)=>{
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

app.use('/recommendProduct',function(req,res){
    let {pathname, query}=url.parse(req.url, true);
    var querySql = "select g.id,g.name,g.price,g.amount,g.typeId,g.path,g.content,g.status,t.parent_id,t.name as typeName,gr.id as relationId ";
    querySql += " from mall_goods_recommend gr ";
    querySql += " left join mall_goods g on g.id = gr.goodId ";
    querySql += " left join mall_type t on t.id = g.typeId ";
    querySql += " where 1=1 order by gr.createTime desc ";

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
    updateSql += " name = '" + goodsName + "',";
    updateSql += " price = '" + price + "',";
    updateSql += " amount = '" + amount + "',";
    updateSql += " path = '" + path + "',";
    updateSql += " typeId = '" + typeId + "',";
    updateSql += " content = '" + content + "',";
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

app.use('/toIndexProduct',function(req,res){
    var des_file = __dirname + "/" + req.files[0].originalname;
    let arr=[];
    arr.push(req.files[0].originalname);
    arr.push(req.files[0].filename);
    arr.push(req.files[0].mimetype.split('/')[1]);
    var path = '/upload/'+req.files[0].filename +'.'+req.files[0].mimetype.split('/')[1];
    fs.renameSync('./www/upload/' + req.files[0].filename,"./www" + path);
    let uuid1 = uuid.v4().replace(/\-/g,'');
    let indexGoodId = req.body.indexGoodId;
    let createTime = new Date().toLocaleString();
    let saveSql= "insert into mall_goods_index (id,goodId,path,createTime) value (?,?,?,?)";
    db.query(saveSql,[uuid1,indexGoodId,path,createTime], (err)=>{
        if(err){
            res.write('{"err": 1, "msg": "database error"}');
            res.end();
        }else{
            res.write('{"err": 0, "msg": "success"}');
            res.end();
        }
    });
});

app.use('/queryIndexProduct',function(req,res){
    let {pathname, query}=url.parse(req.url, true);
    let status = req.query.status;
    var querysql = "SELECT i.path,i.id,i.goodId,i.createTime,g.name,t.name as typeName ";
    querysql += " FROM mall_goods_index i ";
    querysql += " left join mall_goods g on i.goodId = g.id ";
    querysql += " left join mall_type t on g.typeId = t.id ";
    querysql += " where 1 = 1 ";
    if(status != '' && status != null){
        querysql += " and g.status = '" + status + "' ";
    }
    querysql += " order by i.createTime desc ";
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

app.use('/deleteIndexProduct',function(req,res){
    let id = req.query.id;
    let updateSql="delete from mall_goods_index ";
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

app.use('/changeProductStatus',function(req,res){
    let id = req.query.id;
    let status = req.query.status;
    let updateSql="update mall_goods set ";
    updateSql += " status = '" + status + "'";
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

app.use('/deleteProduct',function(req,res){
    let id = req.query.id;
    let updateSql="delete from mall_goods ";
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

app.use('/deleteCreditProduct',function(req,res){
    let id = req.query.id;
    let updateSql="delete from mall_integral_goods ";
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

app.use('/deleteCreditDown',function(req,res){
    let id = req.query.id;
    let updateSql="delete from mall_integral_order ";
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

app.use('/deleteRecommendProduct',function(req,res){
    let id = req.query.id;
    let updateSql="delete from mall_goods_recommend ";
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

app.use('/reommendProduct',function(req,res){
    let goodId = req.query.id;
    let createTime = new Date().toLocaleString();
    let uuid1 = uuid.v4().replace(/\-/g,'');
    let updateSql="insert into mall_goods_recommend (id,goodId,createTime) values (?,?,?) ";
    db.query(updateSql, [uuid1,goodId,createTime],(err)=>{
        if(err){
            res.write('{"err": 1, "msg": "database error"}');
            res.end();
        }else{
            res.write('{"err": 0, "msg": "success"}');
            res.end();
        }
    });
});


app.use('/saveCreditProduct',function(req,res){
    let goodId = req.query.goodId;
    let amount = req.query.amount;
    let integralCount = req.query.integralCount;
    let content = req.query.content;
    let createTime = new Date().toLocaleString();
    let uuid1 = uuid.v4().replace(/\-/g,'');
    let updateSql="insert into mall_integral_goods (id,goodId,amount,integralCount,content,status,createTime) values (?,?,?,?,?,?,?) ";
    db.query(updateSql, [uuid1,goodId,amount,integralCount,content,'1',createTime],(err)=>{
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
        var data3 = {};
        if(querystr == '' || querystr == null){
            data3.rows = [];
            var html=ejs.render(template1,data3);
            res.writeHead(200,{"content-type":"text/html"});
            res.end(html);
            return;
        }
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
        db.query(`SELECT * FROM mall_order WHERE status != '3' AND userName = ? order by createTime desc`,userName, function(err, rows,fields){
            if(err){
                res.write('{"err": 1, "msg": "database error"}');
                res.end();
            }else{
                async.map(rows,function(item,callback){
                    var qquery = "select og.id,og.orderId,og.goodId,og.amount,og.price,g.path,g.name";
                    qquery += " from mall_order_goods og left join mall_goods g on og.goodId = g.id ";
                    qquery += " where orderId = ?";
                    db.query(qquery,item.id, function(err, goods,fields){
                        if(err){
                        }else{
                            item.goods =goods;
                            callback(null, item);
                        }
                     })
                }, function(err,results) {
                    data3.rows = results;
                    var html=ejs.render(template1,data3);
                    res.writeHead(200,{"content-type":"text/html"});
                    res.end(html);
                });
            }
        })
    })
});

app.use('/queryOrder', function(req, res) {
    var userName = req.query.userName;
    var status = req.query.status;
    //从数据库查询  status为0的商品
    var data3 = {};
    var querySql = "SELECT * FROM mall_order WHERE status != '3' AND userName = ? ";
    if(status != '' && status != null){
        querySql += " and status = '" + status + "'";
    }
    querySql += " order by createTime desc";
    db.query(querySql,userName, function(err, rows,fields){
        if(err){
            res.write('{"err": 1, "msg": "database error"}');
            res.end();
        }else{
            async.map(rows,function(item,callback){
                var qquery = "select og.id,og.orderId,og.goodId,og.amount,og.price,g.path,g.name";
                qquery += " from mall_order_goods og left join mall_goods g on og.goodId = g.id ";
                qquery += " where orderId = ? and og.status = '1' ";
                db.query(qquery,item.id, function(err, goods,fields){
                    if(err){
                    }else{
                        item.goods =goods;
                        callback(null, item);
                    }
                })
            }, function(err,results) {
                data3.rows = results;
                let result = JSON.stringify(data3);
                res.write(result);
                res.end();
            });
        }
    })
});

app.use('/queryCredit', function(req, res) {
    var userName = req.query.userName;
    var status = req.query.status;
    //从数据库查询  status为0的商品
    var data3 = {};
    var querySql = "SELECT mg.name,mg.path,ir.count,ir.createTime,ir.status ";
    querySql += " FROM mall_integral_record ir ";
    querySql += " left join mall_integral_order io on io.recordId = ir.id  ";
    querySql += " left join mall_integral_goods ig on io.integralId = ig.id  ";
    querySql += " left join mall_goods mg on mg.id = ig.goodId  ";
    querySql += " WHERE ir.userName = ? ";
    if(status != '' && status != null){
        querySql += " and ir.status = '" + status + "'";
    }
    querySql += " order by ir.createTime desc";
    db.query(querySql,userName, function(err, rows,fields){
        if(err){
            res.write('{"err": 1, "msg": "database error"}');
            res.end();
        }else{
            data3.rows = rows;
            let result = JSON.stringify(data3);
            res.write(result);
            res.end();
        }
    })
});

app.use('/queryIntegral',function(req,res){
    var userName = req.query.userName;
    db.query("SELECT * FROM mall_user WHERE userName = ?",userName, (err, data)=>{
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

app.use('/orderSave', function(req, res) {
    var userName = req.query.userName;
    var totalPrice = req.query.totalPrice;
    var orderStr = req.query.orderStr;

    if(totalPrice == '' || totalPrice == null){
        totalPrice = 0;
    }
    // 定义100块钱一积分
    var integral = parseFloat(totalPrice)/100;
    integral = integral.toFixed(0);

    let uuid1 = uuid.v4().replace(/\-/g,'');
    let orderNo = stringRandom(8);
    let createTime = new Date().toLocaleString();
    var saveOrder = `insert into mall_order (id,orderNo,totalPrice,userName,status,createTime) values(`;
    saveOrder += "'" + uuid1 + "','" + orderNo + "','" + totalPrice + "','" + userName + "','0','" + createTime + "')";
    db.query(saveOrder, (err)=>{ });

    var orderList = orderStr.split(",");
    if(orderList.length > 0){
        orderList.splice(orderList.length-1,1);
        for(var i = 0 ; i < orderList.length ; i++){
            var or = orderList[i];
            var ors = or.split("-");
            let uuid2 = uuid.v4().replace(/\-/g,'');
            var saveOrderGood = `insert into mall_order_goods (id,orderId,goodId,amount,price) values(`;
            saveOrderGood += "'" + uuid2 + "','" + uuid1 + "','" + ors[0] + "','" + ors[2] + "','" + ors[1] + "')";
            db.query(saveOrderGood, (err)=>{ });
        }
    }
    // 更新个人积分
    var updateUserSql = "update mall_user set integral = ifnull(integral*1,0)+" + integral + " where userName = ?";
    db.query(updateUserSql,userName, (err)=>{ });
    // 保存积分记录
    var saveRecordSql = "insert into mall_integral_record (id,count,userName,status,createTime) values(?,?,?,?,?)"
    let uuid2 = uuid.v4().replace(/\-/g,'');
    db.query(saveRecordSql, [uuid2,integral,userName,'0',createTime],(err)=>{ });
    res.write('{"err": 0, "msg": "success"}');
    res.end();
});

app.use('/deleteOrder', function(req, res) {
    var id = req.query.id;
    var delOrder = "update mall_order set status = '3' where id=?";
    db.query(delOrder,id, (err)=>{
        if(err){
            res.write('{"err": 1, "msg": "database error"}');
             res.end();
        }else{
            res.write('{"err": 0, "msg": "success"}');
            res.end();
        }
    });
});

app.use('/updateOrderStatus', function(req, res) {
    var id = req.query.id;
    var status = req.query.status;
    var updateOrder = "update mall_order set status = ? where id=?";
    db.query(updateOrder,[status,id], (err)=>{
        if(err){
            res.write('{"err": 1, "msg": "database error"}');
             res.end();
        }else{
            res.write('{"err": 0, "msg": "success"}');
            res.end();
        }
    });
});

app.use('/confirmOrder', function(req, res) {
    var id = req.query.id;
    var delOrder = "update mall_order set status = '2' where id=?";
    db.query(delOrder,id, (err)=>{
        if(err){
            res.write('{"err": 1, "msg": "database error"}');
             res.end();
        }else{
            res.write('{"err": 0, "msg": "success"}');
            res.end();
        }
    });
});

app.use('/detail', function(req, res) {
    fs.readFile("./www/detail.ejs",function(err,data){
        var template1=data.toString();
        var id = req.query.id;
        //从数据库查询  status为0的商品
        var data3 = {};
        db.query(`SELECT * FROM mall_goods WHERE status = 1 and id= ?`,id, (err, data1)=>{
            if(err){
                res.write('{"err": 1, "msg": "database error"}');
                res.end();
            }else{
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
        var qquerySql = "SELECT ig.id,ig.goodId,ig.amount,ig.integralCount,ig.startTime,ig.endTime,ig.content,ig.useCount,g.path,g.name ";
        qquerySql +="FROM mall_integral_goods ig left join mall_goods g on g.id = ig.goodId ";
        qquerySql +=" WHERE ig.status = '1'";
        db.query(qquerySql, (err, data1)=>{
            if(err){
                res.write('{"err": 1, "msg": "database error"}');
                res.end();
            }else{
                data3.rows = data1;
                var html=ejs.render(template1,data3);
                res.writeHead(200,{"content-type":"text/html"});
                res.end(html);
            }
        });
    })
});

app.use('/toexchange', function(req, res) {
    var userName = req.query.userName;
    var integralCount = req.query.integralCount;
    var goodId = req.query.id;
    let createTime = new Date().toLocaleString();

    // 更新个人积分
    var updateUserSql = "update mall_user set integral = ifnull(integral*1,0)-" + integralCount + " where userName = ?";
    db.query(updateUserSql,userName, (err)=>{ });
    // 保存积分记录
    var saveRecordSql = "insert into mall_integral_record (id,count,userName,status,createTime) values(?,?,?,?,?)"
    let uuid2 = uuid.v4().replace(/\-/g,'');
    db.query(saveRecordSql, [uuid2,integralCount,userName,'1',createTime],(err)=>{ });
    // 保存兑换记录
    var saveOrderSql = "insert into mall_integral_order (id,integralId,userName,recordId,createTime) values(?,?,?,?,?)"
    let uuid3 = uuid.v4().replace(/\-/g,'');
    db.query(saveOrderSql, [uuid3,goodId,userName,uuid2,createTime],(err)=>{ });
    res.write('{"err": 0, "msg": "success"}');
    res.end();
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
        var querySql = "select mg.id,mg.name,mg.path,mg.price,mg.amount,mg.content ";
        querySql += " from mall_goods_recommend gr";
        querySql += " left join mall_goods mg on gr.goodId = mg.id";
        querySql += " where mg.status = '1'"
        db.query(querySql, (err, data1)=>{
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

app.post('/file_upload', function (req, res) {
    var des_file = __dirname + "/" + req.files[0].originalname;
    let arr=[];
    arr.push(req.files[0].originalname);
    arr.push(req.files[0].filename);
    arr.push(req.files[0].mimetype.split('/')[1]);
    var path = '/upload/'+req.files[0].filename +'.'+req.files[0].mimetype.split('/')[1];
    fs.renameSync('./www/upload/' + req.files[0].filename,"./www" + path);
    var id = "1";
    let sql=`INSERT INTO mall_goods (path,id) VALUES ('${path}','${id}')`;
    db.query(sql, (err)=>{
        if(err){
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

var server = app.listen(38080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})