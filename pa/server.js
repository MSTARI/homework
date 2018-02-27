var cheerio = require('cheerio');
var http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;

var mUrl = 'mongodb://127.0.0.1:27017/';
var source = {};

http.createServer(function (requ, resp) {
    resp.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    var query = url.parse(requ.url, true).query;
    if (!query.url) {
        MongoClient.connect(mUrl, function (err, db) {
            if (err) throw err;
            var dbo = db.db('pa');
            dbo.collection('datas').find().count(function (err, res) {
                source.num = res;
            });
            dbo.collection('datas').find().skip((Number(query.index) - 1) * 3).limit(3).toArray(function (err, res) {
                source.data = res;
                if (JSON.stringify(source) !== '{}') {
                    resp.end(query.callbackParam + '(' + JSON.stringify(source) + ')');
                }
            });
            db.close();
        });
    } else {
        http.get(query.url, function (res) {
            var html = '';
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                html += chunk;
            });
            res.on('end', function () {
                var $ = cheerio.load(html);
                var text = $('#readerFs p').text();
                var info = {
                    title: $('.tc.txt h1').text(),
                    word: text.length,
                    chinese: text.match(/[\u4e00-\u9fa5]/g).length,
                    english: text.match(/[a-zA-Z]/g) !== null ? text.match(/[a-zA-Z]/g).length : 0,
                    symbol: text.match(/[^\u4e00-\u9fa5\da-zA-Z]/g).length,
                    link: query.url
                };
                MongoClient.connect(mUrl, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db('pa');
                    dbo.collection('datas').insertOne(info, function (err, res) {
                        if (err) throw err;
                        console.log('insert success');
                    });
                    dbo.collection('datas').find().count(function (err, res) {
                        source.num = res;
                    })
                    dbo.collection('datas').find().skip((Number(query.index) - 1) * 3).limit(3).toArray(function (err, res) {
                        source.data = res;
                        if (JSON.stringify(source) !== '{}') {
                            resp.end(query.callbackParam + '(' + JSON.stringify(source) + ')');
                        }
                    });
                    db.close();
                });
            });
        });
    }

}).listen(8080);

console.log('success');