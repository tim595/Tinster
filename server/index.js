const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.get("/login", function(req, res) {
    res.sendFile(__dirname + '/test.html');
  }
);

app.post('/submit-login', function (req, res) {
    var nameInput = req.body.userName;
    var passwordInput = req.body.password;

    /*
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("tinster");
        var query = { userName: nameInput };
        dbo.collection("user").findOne(query, function(err, result) {
          if (err) throw err;
          else if (result == null) {
              res.end("Nutzer nicht vorhanden.");
          }
          else if (result.passwort != passwordInput) {
              res.end("Passwort falsch.");
          }
          else {
              res.redirect('/startseite');
          }
        });
    });
    */
});

app.get("/startseite", function(req, res) {
    res.sendFile(__dirname + '/startseite.html');
})

/*
app.get("/startseite", function(req, res) {
    res.send("placeholder");
})
*/

app.listen(8080, function() {
  console.log("Server gestartet");
});
