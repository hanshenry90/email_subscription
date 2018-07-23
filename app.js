// PACKAGES definition and use

var express=require("express") // using express FRAMEWORK package, taking care of BACKEND
var app= express() // run the actual express coding
var faker=require("faker")
var mysql=require("mysql")
var bodyParser=require("body-parser")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

// establish MySQL connection to app.js

var connection=mysql.createConnection({
    
    host: 'localhost',
    user: 'hans90',
    database: 'join_us'
})


// app.get("/joke", function(req, res){  // request and response coding, ROUTE
    
    
//     var joke = '<strong>What do you call a dog that does magic tricks?</strong>  <em>A labracadabrador</em>.'
//     res.send(joke)
    
// });

// HOME PAGE
 
app.get('/', function(req, res){  // real-time update db
    // Find count of users in DB
    // Respond with that count
    
    var q = "Select Count(*) as count from users"
    connection.query(q, function(err, results){
        
        if (err) throw err
        var count = results[0]['count']
        // res.send("We have "+count+ " users in our db")
        res.render("home", {data: count}) // now we can write our code in sperate file home.ejs instead everything here!
        
    });
});


// app.get("/random_num", function(req, res) {
//     var num=Math.floor(Math.random() * 10) +1
//     res.send("your lucky number is " +num)
    
// })


app.listen(8080, function(){ // open up a portal/tunnel towards .js app code and DB

    console.log("server running on 8080!")

});

// POST ROUTE

app.post("/register", function(req,res){
    
    // var email = req.body.email
    var person={email: req.body.email
                // created_at: faker.date.past()
    }
    
    //  STANDARD WAY OF INSERT INTO TABLE
    connection.query('INSERT into users set ?', person, function(err, results){
        
        if (err) throw err
        res.redirect("/") // redirect to / of app.get("/") to update the count
        // res.send("Thanks joining our waitlist!")
        
        
    })
    
    // console.log(req.body['email'])
    // console.log("POST request sent to /register email is " + req.body.email) //bodyParser is used in app.js
    
    
});