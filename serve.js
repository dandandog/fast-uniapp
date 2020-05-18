var express = require("express"); //引入express模块
var app = express(); //express官网就是这么写的就是用来创建一个express程序，赋值给app。 当公式记住就行
var Mock = require("mockjs"); //引入mock模块
var MockRandom = Mock.Random; //Mock.Random 是一个工具类，用于生成各种随机数据。

var pageCount = MockRandom.integer(1, 10); //pageCount：页数 ， 生成1-10的随机整数
var ids = 10000; //自增长id 从10000开始
var templatesList = {}; //数据模板

//设置跨域访问
app.all("*", function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", " 3.2.1");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

//设置get请求
app.get("/text", function(req, res, next) {
	templatesList = {
		"list|20": [ //每页加载20条数据
			{
				"id|+1": 1000,
				"title": "@ctitle(5, 50)",
				"describe": "@cparagraph()",
				"author": "@cname()",
				"cover_img": "@image('200x120', '@color', '#FFF', 'Mock.js')",
				"type|1": ["1", "2"],
				"create_time": "@datetime"
			}
		]
	}
	var mockData = Mock.mock(templatesList); //将定义的数据模板放入mock方法中
	res.json({ //发送一个json的响应
		status: true,
		data: mockData,
		msg: "操作成功"
	});
});

//配置服务端口
var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('listen at http://localhost:8080');
});
