
		/**
		 * Module dependencies.
		 */

		var express = require('express')
		  , routes = require('./routes')
		  , user = require('./routes/user')
		  , http = require('http')
		  , path = require('path')
		  , db = require('mongoose');

		var app = express();

		// all environments
		app.set('port', process.env.PORT || 3000);
		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(require('stylus').middleware(__dirname + '/public'));
		app.use(express.static(path.join(__dirname, 'public')));

		// development only
		if ('development' == app.get('env')) {
		  app.use(express.errorHandler());
		}

		// set up db connection
		var Inventory;
		var mongo_connection = db.connect("mongodb://localhost/test");
		var connection_string = db.connection;
		connection_string.on('error', console.error.bind(console, "Couldn't establish DB connection"));
		connection_string.once('open',function callback() {
			    console.log("Established connection");
			    var inventorySchema =  {
				name          : String,
				company       : String,
				barcode       : String,
				project       : String
				};
				Inventory = connection.model('Inventory', inventorySchema);
		});	

		// Create an inventory record	
		var mouse =  new Inventory({name: "mouse", company: "Genius", barcode: "132-str-xxx", project: "Gruppo-PAM"});
		mouse.save(function(){
		   console.log("Successfully created the stock" + mouse);
		});

		app.get('/', routes.index);
		app.get('/users', user.list);

	    //Get Inventory
	    var stock_details = Inventory.find({}, function(error, stocks) {
	    	if(error) {
	    		response.json(error);
	    	}

	    	else if(stock == null) {
	    		response.json("No Inventory Details Available");
	    	}

	    	else {
	    		response.json(stocks)
	    	}
	    });
	    
	    // Display inventory 
		app.get('/stock', function(request, response){
			var reponse_content = stock_details();
		    response.writeHead(200, {"Content-Type}" : "text/json"});
			response.end("HELLO WORLD ," + reponse_content + " Welcome to the new World!" );
		});

		connection_string.close();

		http.createServer(app).listen(app.get('port'), function(){
		  console.log('Express server listening on port ' + app.get('port'));
		});
