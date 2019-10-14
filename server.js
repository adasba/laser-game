//logging
var fs = require('fs');
function writeLog(buf) {
    var fd = fs.openSync("log.txt", 'a+');
    fs.write(fd, buf, 0, buf.length, 0, function () {});
}



var http = require('http');
var express = require('express');

var app = express();

app.get(/[\s\S]*/, function (req, res) {
    if (!/auth.json/.test(req.url) && !/log.txt/.test(req.url)) {
        res.sendFile(__dirname + req.url, {}, function (err) {
            if (err) {
                res.sendFile(__dirname + "/404.html");
            }
        });
    } else {
        res.send("<h1>fuck you</h1>");
    }
    writeLog("OPENED URL: " + req.url + "     TIME: " + new Date() + "     IP: " + req.ip + "\n");
});

app.listen(42069, function () {
	console.log('App successfully started.');
});
