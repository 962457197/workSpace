var NodeRSA = require('node-rsa');
var request = require('request');
var express = require('express');
var url="https://dev-openapi.dmhmusic.com/OPENAPI/openApiLogin.json";
httprequest(url);


function httprequest(url,requestData){
    request({
        url: url,
        gzip:true,
        method: "POST",
        json: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: { q_source: 'lIdKAFMQxgNJM', zone: 'cn' }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
           // console.log(body) // 请求成功的处理逻辑
            var publickey=body.data;
            //console.log("==========="+publickey);
            getother(publickey)


        }
    });
};
//处理publickey
function  getother(publickey){
   var a=publickey.replace("-----BEGIN PUBLIC KEY-----","");
   var key=a.replace("-----END PUBLIC KEY-----","");
    console.log("==========="+key);
    getservice(key);
}

function httprequest2(url,data){
    request({
        url: url+"&"+data,
        gzip:true,
        method: "POST",
        json: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        // form: { q_source: 'lIdKAFMQxgNJM', zone: 'cn' }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
            var publickey=body.data;
            //console.log("==========="+publickey);
            getother(publickey)


        }
    });
};
//调用其它接口
function getservice(key){
    var urlservice='https://dev-openapi.dmhmusic.com/auth/';
    var param={"action":"/OPENAPI/getSpSessionBizList.json","method":"POST"};
    var rsa = RSA(param,key);

    httprequest2(urlservice,rsa);
}
//RSA加密
function RSA(json,key){
    key = new NodeRSA(key,'pkcs8-public');
    var encrypted = key.encrypt(json, 'base64');
    console.log("==========="+encrypted);
    return encrypted;  // 加密后数据
}