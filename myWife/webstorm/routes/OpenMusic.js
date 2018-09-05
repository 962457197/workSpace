// var http = require('http');
// //设置请求地址
// var baiduUrl={
//     "getUrl":"https://dev-openapi.dmhmusic.com/OPENAPI/openApiLogin.json"
// }
// //设置基本参数
// var Basics={
//     q_source:"lIdKAFMQxgNJM",
//     zone:"CN"
// }
//
// var a = function(){
//     var results=http.postUrl(baiduUrl.getUrl,Basics);
//     console.log("=========="+results);
// }
// a();







var request = require('request');
var url="https://dev-openapi.dmhmusic.com/OPENAPI/openApiLogin.json";
var requestData={
    q_source: "lIdKAFMQxgNJM",
    zone: "CN"
}

httprequest(url,requestData);


function httprequest(url,requestData){
    request({
        url: url,
        gzip:true,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
        }
    });
};
