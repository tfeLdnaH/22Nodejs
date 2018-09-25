var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to the database
mongoose.connect('mongodb://test:test@ds149905.mlab.com:49905/ztodo');

//mongoose.connect('mongodb://moritz:@lface21@todo-shard-00-00-lrj7c.mongodb.net:27017,todo-shard-00-01-lrj7c.mongodb.net:27017,todo-shard-00-02-lrj7c.mongodb.net:27017/admin?replicaSet=todo-shard-0&ssl=true');

//create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
	item: String//what mongodb is expected 
});

//creating a model type todoschema
var Todo = mongoose.model('Todo', todoSchema); //fist 'Todo' is a module. sencond 'Todo' store as a collection on mongodb

/*
*secondversion - it save static data to the database
it will save that item on mongodb straightaway when we run -> node app
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
	if (err) throw err;
	console.log('item saved'); //
});*/

//*fistversion -> var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick someone'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//urlencodedParser is a middleware


module.exports = function(app){
	app.get('/todo', function(req, res){
		//get data from mongodb and pass it to view
		//will retrieve all item of this collection. if I wanna find just a specific item the corresponding piece of code is Todo.find({item: 'buy flower'})
		Todo.find({}, function(err, data){//will return in data
			if (err) throw err;
			res.render('todo',{todos: data});
			console.log('getttt');
		});		
	//*fistversion -> res.render('todo',{todos: data});	
	});

	app.post('/todo', urlencodedParser, function(req, res){		
		//get data from the view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});
//*fistversion ->		data.push(req.body); // add to array
//*fistversion ->		console.log('posttttt');
//*fistversion ->		res.json(data); //come from when success for "refresh"	
//	});

	app.delete('/todo/:item', function(req, res){
		//delete the requested item from mongodb
		//replace "-" to space
		Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			if (err) throw err;
			res.json(data);	
		}); 
//*fistversion ->		data = data.filter(function(todo){
//*fistversion ->			//replace any space to -
//*fistversion ->			return todo.item.replace(/ /g, '-') !== req.params.item; 
//*fistversion ->			//return true(remains) or false(comes out)
		});
//*fistversion ->		res.json(data);
	});
};