var express = require('express');

var todoController = require('./controllers/todoController');
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files in order to find styles.css
app.use(express.static('./public'));


//fire or trigger controller
todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');

//model = data(list items) example: todo, users
//view = what we send to user(template files ejs), todo.ejs, account.ejs
//controller = the app sections example: todoController, userController, bridge between view and model
