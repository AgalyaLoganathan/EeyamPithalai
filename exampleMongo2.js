
var databaseUrl = "myDb";	// connection string / db name
var collections = ["users"];	// table names / list of Collection Names
var db = require("mongojs").connect(databaseUrl,collections);

var users = db.users; 	//users Collection


var someObject = { name : "object1", description : "My First Object" };
users.save(someObject);		//insert something into collection.


//retrieve all objects in collection
users.find( function(err,usersList) { //somecallback function that receives the Collection of objects.
	if (usersList) {
		console.log("======= List of all objects in users collection: ");
		console.log(usersList);
	};
});


//save another object
var someOtherObject = { name : "object2", description : "My second object" };
users.save(someOtherObject);

//filter based on some value  -- find `object1`
users.find( { name : "object1"}, function(err,userList) { //somecallback function that receives the Collection of filtered objects.
	if (userList) {
		console.log("======= found object1 on searching : ");
		console.log(userList);
	};
});