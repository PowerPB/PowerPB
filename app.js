var fs = require('fs');
//加载mongodb
var MongoClient = require("mongodb").MongoClient;
//posts为数据库的蜜罐子
var DB_URL = "mongodb://localhost:27017/posts";


//存储对象数据
var datas = {};


fs.readFile('test.txt', 'utf-8', function(err, data) {
	//存储题目
	var title = new Array();
	//存储内容的数组
	var content = new Array();
	//存储每行的数组
	var contents = new Array();

	if (err) {
		console.log(err);
	} else {
		var trimData = trim(data);
		var strs = new Array(); //定义一数组 
		strs = trimData.split("\r"); //字符分行
		var num = 0; //存储8个数据
		var nums = 0; //用来存储每一行
		for (i = 0; i < strs.length; i++) {
			//切割题目
			if (i == 0) {
				// console.log(strs[i]); //分割后的字符输出
				var stitle = strs[i].split(" ");
				for (var j = 0; j < stitle.length; j++) {
					if (stitle[j] == '') {

					} else {
						title.push(stitle[j]);
					}
				}
			} else {
				var scontent = strs[i].split(" ");
				for (var z = 0; z < scontent.length; z++) {
					if (scontent[z] == '') {

					} else {
						content.push(scontent[z]);

					}
				}
				// console.log(content);
				contents.push(content);
				//清空每一行数组
				content = [];
			}
		}

		//组成数据库的对象模型
		// var data={
		// 	'name':"ABC"
		// }
		for (var c = 0; c < contents.length; c++) {
			for (var p = 0; p < title.length; p++) {
				datas[title[p]] = contents[c][p];
			}
			
			(function() {
				var dataed = datas;
				console.log(dataed);
				setTimeout(function() {
					MongoClient.connect(DB_URL, function(error, db) {
						var devices = db.collection('content');
						console.log('连接成功!');
						
						devices.insert(datas, function(error, result) {
							if (error) {
								console.log('Error:' + error);
							} else {

								console.log(result.result.n);
							}
							db.close();
						});
					});
				},12000)
			})()
		}



		/*for (var t = 0; t < strs.length; t++) {
			if (t != 0) {
				var scontent = strs[t].split(" ");
				for (var z = 0; z < scontent.length; z++) {
					if (scontent[z] == '') {

					} else {
						content.push(scontent[z]);

					}
				}
				console.log(content);
				contents.push(content);
				//清空每一行数组
				content = [];
			}
		}*/
		// console.log(contents);
	}
});

//数据库存储
function insertData(db) {

	var data = datas;
	devices.insert(data, function(error, result) {
		if (error) {
			console.log('Error:' + error);
		} else {

			console.log(result.result.n);
		}
		db.close();
	});
}
/*MongoClient.connect(DB_URL, function(error, db) {
	console.log('连接成功!');
	insertData(db);
});
*/
　 //截图所有字符串
function Trim(str, is_global) {
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g, "");
	if (is_global.toLowerCase() == "g") {
		result = result.replace(/\s/g, "");
	}
	return result;
}

function trim(str) { //删除左右两端的空格
	　　
	return str.replace(/(^\s*)|(\s*$)/g, "");　　
}
console.log('end.');