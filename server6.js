const http=require('http');
const mysql=require('mysql');
const fs=require('fs');
const url=require('url');
const zlib=require('zlib');
const crypto=require('crypto');
const uuid = require('uuid');


const _key='sadfslekrtuew5iutoselgdtjiypoydse4ufhs.edtyo;s8te4arfeliawkfhtsie5tlfia;sefdshroiupeoutwyeli5gurse;ihf';

function md5(str){
    let obj=crypto.createHash('md5');

    obj.update(str);

    return obj.digest('hex');
}

function md5_2(str){
    return md5(md5(str)+_key);
}

let db=mysql.createPool({host: '47.98.133.20', port: 3306, user: 'aliyun_user', password: '123qwe123', database: 'mall'});

let server=http.createServer((req, res)=>{
        let {pathname, query}=url.parse(req.url, true);
let {userName, password,name,phone,gender,id,role,userNameSearch,roleSearch,status,parent_id,level}=query;


switch(pathname){
    //接口
    case '/reg':
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
        break;
    case '/login':
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
        break;
    case '/user':
        var querysql = `SELECT * FROM mall_user WHERE 1=1 `;
        db.query(querysql, (err, data)=>{
            if(err){
                        res.write('{"err": 1, "msg": "database error"}');
                        res.end();
                    }
            else{
                let data1 = JSON.stringify(data);
                    res.write(data1);
                //res.json({code: 200, message: "get gg_account list success", data: data});
                res.end();

                }
});
        break;
    case '/addUser':
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
        break;
    case '/delUser':
            db.query(`DELETE FROM mall_user WHERE id = '${id}'`, (err, data)=>{
                if(err){
                    res.write('{"err": 1, "msg": "database error"}');
                    res.end();
                }else{
                    res.write('{"err": 0, "msg": "success"}');
            res.end();
            }
            });
        break;
        case '/alterUser':
            db.query(`SELECT * FROM mall_user WHERE id = '${id}'`, (err, data)=>{
                if(err){
                    res.write('{"err": 1, "msg": "database error"}');
                    res.end();
                }else{
                    let data1 = JSON.stringify(data);
                    res.write(data1);
                    //res.write();
            res.end();
            }
            });
                break;
        case '/alterUserSave':
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
        break;

        case '/type':
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
        break;

        case '/addType':
        console.log(name);
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
        break;

        case '/addChildType':
        console.log(name);
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
        break;

        case '/delType':
            db.query(`DELETE FROM mall_type WHERE id = '${id}'`, (err, data)=>{
                if(err){
                    res.write('{"err": 1, "msg": "database error"}');
                    res.end();
                }else{
                    res.write('{"err": 0, "msg": "success"}');
                    res.end();
                }
            });
        break;

        case '/alterType':
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
        break;


        case '/alterTypeSave':
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
        break;

        case '/product':
            var querysql = "SELECT * FROM mall_goods WHERE 1=1 ";
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
        break;

    default:
        //缓存      TODO
        //静态文件
        let rs=fs.createReadStream(`www${pathname}`);
        let gz=zlib.createGzip();

        res.setHeader('content-encoding', 'gzip');
        rs.pipe(gz).pipe(res);

        rs.on('error', err=>{
            res.writeHeader(404);
        res.write('Not Found');
        res.end();
});

}
});
server.listen(8080);
