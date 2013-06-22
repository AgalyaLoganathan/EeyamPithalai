var http  = require('http');
var mongoose = require('mongoose');
var comrade1;

mongoose.connect("mongodb://localhost/test");
var connnectionString = mongoose.connection;
connnectionString.on('error',console.error.bind(console, "Error"));
connnectionString.once('open', function callback(){
  console.log("Success in connection");
  var Geek = connnectionString.model('Geek', {
	name: String
});

comrade1 = new Geek({ name: "Orwell"});
comrade1.save(function(){
	console.log("Comreade is " + comrade1);
})

});



var server = http.createServer(function(reg, res){
	res.writeHead(200, {"Content-Type}" : "text/plain"});
	res.end("HELLO WORLD ," + comrade1.name + " Welcome to the new World!" );
});

server.listen(5000);