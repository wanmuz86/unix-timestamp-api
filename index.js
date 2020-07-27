var express = require('express');
var app = express();

var bodyParser =  require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

var port = process.env.PORT || 8080

var router = express.Router();

router.get('/', function(req,res){
	res.json({message:'hooray welcome to my API'})
})

router.get('/timestamp/:date', (req,res)=>{
	if(parseInt(req.params.date*1000)){
		res.json({"unix":req.params.date, "utc":new Date(req.params.date*1000)});
	} else {
		if (new Date(req.params.date) != "Invalid Date"){
			res.json({"unix":req.params.date, 
				"utc":(new Date(req.params.date)).getTime()/1000});
		}
		else {
			res.json({"error" : "Invalid Date" })
		}
	}
})

app.use('/api',router)

app.listen(port)
console.log('Magic happens on port '+port);