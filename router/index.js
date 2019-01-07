const express=require('express');
const router = express.Router();
const spider=require('../spider.js');
const fs=require('fs');
const path=require('path');
const axios=require('axios');




router.post('/downloadMp4',function(req,res){
	var url=req.body.src;
	progress=0;
	// console.log(req.query);
	// var url=req.query.url;
	// const iconvLite = require('iconv-lite');
	// var url='https://v.youku.com/v_show/id_XMTc1Njc3MDk4NA==.html?from=y1.2-1-95.4.1-1.1-1-2-0-0%26source%3Dautoclick';
	var spawn = require('child_process').spawn,
	ls = spawn('node',['nightmare.js', url]);
	ls.stdout.on('data',function(data){
		//console.log(data.toString('utf8'));
		res.json({
			status:'ok',
			src:data.toString('utf8')
		})
		// var spawn = require('child_process').spawn;
		var param=data.toString('utf8');
		console.log(data.toString('utf8'));
		//开启子进程
		download=spawn('node',['download.js',param]);
		download.stdout.on('data',function(pro){
			console.log(pro.toString('utf8'));
			pro=pro.toString('utf8')*1;

			if(!isNaN(pro)){
				progress=pro;
				console.log(progress);
			}
		})
		// console.log(iconvLite.decode(data,'gbk'));
	})
})

module.exports=router;