const express=require('express');
const path=require('path');

const app=express();
const consolidate = require('consolidate');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './view'));//设定默认模版


app.listen(4000,callback=function(){
    console.log('port open at 4000');
});

//app.use(express.static('./dist'));
app.use('/',express.static(path.join(__dirname, 'assets')));//设置静态资源目录
app.use('/admin',express.static(path.join(__dirname, 'assets')));//设置静态资源目录    


app.use('/',require('./router/index'));
app.use('/admin',require('./router/admin'));

