var express=require('express');
var app=express();
var port=process.env.PORT || 3000;

var http=require('http');
var socketio=require('socket.io');
var server=http.Server(app);
var io=socketio(server);

var mongoclient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/data";

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
	if(choice==0)
	{
		var dds=req.body.dropdownspec;
		var phclinic=req.body.phclinic;
		var fees=req.body.fees;
		var ddd=req.body.dropdowndays;
	}
	//feed to mongo
	mongoclient.connect(url,{useNewUrlParser:true},(err,db)=>
	{
		if(!err)
		{
			var db=db.db('data');
			if(choice==0)
			{
				var coll=db.collection('doctor');
				coll.insertOne({
					"fname":fname,
					"lname":lname,
					"mail":mail,
					"pass":pass,
					"phone":ph,
					"category":"doctor",
					"specialization":dds,
					"phone-clinic":phclinic,
					"fees":fees,
					"availability":ddd
				});
				res.sendFile(path.join(publicpath,'/doctor.html'));
			}
			else {
				var coll=db.collection('patient');
				coll.insertOne({
					"fname":fname,
					"lname":lname,
					"mail":mail,
					"pass":pass,
					"phone":ph,
					"category":"patient"
				});
				res.sendFile(path.join(publicpath,'/patient.html'));
			}
		}
	});
});

app.post('/login',(req,res)=>{
	var mail=req.body.mail;
	var pass=req.body.pass;
	var cat=req.body.cat;
	if(cat=='doctor')
	{
		res.sendFile(path.join(publicpath,'/doctor.html'));
	}
	else {
		res.sendFile(path.join(publicpath,'/book.html'));
	}
	//check on mongo
});

io.on('connection',function(socket)
{
	socket.on('fromclient',function(message)
{
	io.emit('fromserver',message);
});
});

server.listen(port,()=>
{
	console.log('Server running on port ',port);
});
