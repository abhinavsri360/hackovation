var express=require('express');
var app=express();
var port=process.env.PORT || 3000;

var mongoclient=require('mongodb').MongoClient;

var path=require('path');
var publicpath=path.join(__dirname,'../public');

app.use(express.static(publicpath));

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>
{
	res.sendFile(path.join(publicpath,'/index.html'));
});

app.post('/signup',(req,res)=>{
	var fname=req.body.fname;
	var lname=req.body.lname;
	var mail=req.body.email;
	var pass=req.body.password;
	var ph=req.body.phone;
	var choice=req.body.radiob;
	//feed to mongo
	res.sendFile(path.join(publicpath,'/patient.html'));
});

app.post('/login',(req,res)=>{
	var mail=req.body.mail;
	var pass=req.body.pass;
	//check on mongo
	res.sendFile(path.join(publicpath,'/patient.html'));
});

app.listen(port,()=>
{
	console.log('Server running on port ',port);
});
