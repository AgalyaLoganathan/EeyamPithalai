
var databaseUrl = "myDb";	// connection string / db name
var collections = ["users"];	// table names / list of Collection Names
var db = require("mongojs").connect(databaseUrl,collections);

var users = db.users; 	//users Collection


var someObject = {description:"MyObject"};
users.save(someObject);		//insert something into collection.


//retrieve all objects in collection
users.find( function(err,usersList) { //somecallback function that receives the Collection of objects.
	if (usersList) {
		console.log("List of all objects in users collection: ");
		console.log(usersList);
	};
});