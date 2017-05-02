var express = require('express');
var router = express.Router();
var db = require('./database.js');

router.get('/projects', function(req, res, next) {
	var sql = 'select name, description from project where username = ?' ;
 	var sqlParams = [req.session.user];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			res.render('startpage');
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.name = results[i].name;
 				column.description = results[i].description;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {projects: arr});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

router.get('/following', function(req, res, next) {
	var sql = 'select uid2 from follow where uid1 = ?' ;
 	var sqlParams = [req.session.user];
 	//console.log(sqlParams);
 	db.query(sql, sqlParams, function(results){
 		//console.log(results);
 		if(results==''){
 			console.log('no');
 			res.render('startpage');
 		}
 		else{
 			console.log('yes');
 			//console.log(results[0]);
 			var arr = [];
 			for(var i = 0; i < results.length; i++){
 				var column = {};
 				column.name = results[i].uid2;
 				arr.push(column);
 				//console.log(arr);
 			}
 			//console.log(req.session);
 			res.render('startpage', {following: arr});
 		}
 	});
	//res.sendFile(path.join(__dirname, '../static_views/Login.html'));
});

module.exports = router;