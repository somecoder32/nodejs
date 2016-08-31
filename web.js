var http = require('http'),
	express = require('express'),
	MongoClient = require('mongodb').MongoClient,
	path = require('path');
var bodyParser = require('body-parser');
//csv2json = require('./CSV2JSON');

//var fs = require("fs");
//var traits = JSON.parse(fs.readFileSync('traits.json', 'utf8'));
//var spells = JSON.parse(csv2json.createJson('spellfull.csv'));
//var magicitems = JSON.parse(csv2json.createJson('magic_items_full.csv'));
//var monsters = JSON.parse(csv2json.createJson('monstersfull.csv')); 

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var data;
app.set('port', process.env.PORT || 8081);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
//app.use(express.static(path.join(__dirname, 'public')));

/*
MongoClient.connect("mongodb://localhost:27017/monsters", function(err, db) {
  if(!err) {
    console.log("We are connected");
	
	console.log('inserting traits');
	
	var traitsCollection = db.collection("monsters");
	
	for(var i = 0; i < monsters.length; i++)
	{
		console.log(monsters[i].Name);
		traitsCollection.insertOne(monsters[i]);
	}
	
	console.log("Done");
	
	//var collection = db.collection("spells");
	
	//collection.find({"Name":"Anatomist"}).toArray(function(err, docs) {
	//	console.log(JSON.stringify(docs));
	//});
  }
});*/

app.post('/characters', function(req, res){
	console.log('Will insert' + req.body.Name);
	MongoClient.connect("mongodb://localhost:27017/characters", function (err, db) {
		if (!err) {
			//console.log("We are connected");

			//var collection = db.collection("characters");

			//var classspells = [];
			
			//if (req.body.class === "wiz") {
			//	collection.find({ wiz: req.params.level }, { name: 1, _id:0}).toArray(function (err, docs) {
			//		res.end(JSON.stringify(docs))
			//	});
			//}
		}
	});
});

app.get('/:class/:level', function (req, res) {
	MongoClient.connect("mongodb://localhost:27017/spells", function (err, db) {
		if (!err) {
			//console.log("We are connected");

			var collection = db.collection("spells");
			var searchCriteria = {name: 1, _id: 0};

			//var classspells = [];
			console.log('Gathering spells');
			
			var query = {};
			query[req.params.class] = req.params.level;
			collection.find(query, { name: 1, _id: 0}).toArray(function (err, docs) {
					res.end(JSON.stringify(docs))
				});
		}
	});
});



	app.get('/:Name', function (req, res) {
		console.log('request received');
		MongoClient.connect("mongodb://localhost:27017/monsters", function (err, db) {
			if (!err) {
				console.log(req.params.Name);

				var collection = db.collection("monsters");

				collection.find({ "Name": req.params.Name }, { Name: 1, CR: 1, _id: 0 }).toArray(function (err, docs) {
					data = JSON.stringify(docs);
					//callback(docs);
					//console.log(data);
					res.end(data);
				});

				//collection.find({"name":req.params.Name}).toArray(function(err, docs) {
				//assert.equal(err, null);
				//assert.equal(2, docs.length);
				//console.log("Found the following records");
				//console.dir(docs)
				//data = JSON.stringify(docs);
				//callback(docs);
				//console.log(data);
				//res.end(data);
				//});    

			}
		});

	});


	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express server listening on port ' + app.get('port'));
	});

	function getCharacters() {

		MongoClient.connect("mongodb://localhost:27017/characters", function (err, db) {
			if (!err) {
				console.log("We are connected");

				var collection = db.collection("characters");
				collection.find({}).toArray(function (err, docs) {
					//assert.equal(err, null);
					//assert.equal(2, docs.length);
					console.log("Found the following records");
					//console.dir(docs)
					data = JSON.stringify(docs);
					//callback(docs);
				});

			}
		});
	}