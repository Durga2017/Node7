var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'training'
});
var app = express();

//start
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',function(req,res){
res.sendFile(__dirname+'/index.html');
});
app.post('/submit-student-data',function(req,res) {
	console.log(req.body);
	
	
	  var post = {
        id: req.body.firstname,
        name: req.body.lastname
    };

	
	connection.query('INSERT INTO  userregister set?', req, function(error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');    
        }
    });
	
	
	//connection.query('INSERT INTO  userregister set?', post, function(error) {
      //  if (error) {
      //      console.log(error.message);
      //  } else {
      //      console.log('success');    
      //  }
  //  });
	res.send('success')
});

//end

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

app.get("/vignesh",function(req,res){
	connection.query('SELECT * from userregister', function(err, rows, fields) {
    connection.end();
  if (!err){
    // console.log('The solution is: ', fields);
    res.json(rows);
	}
  else{
    console.log('Error while performing Query.');
	  }
  });
  
});

app.listen(3000);
