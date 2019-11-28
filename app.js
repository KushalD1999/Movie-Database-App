// var app = require("express")();
var express = require('express');
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.get("/",function (req,res) {
    res.render("searchPage");
});

app.get("/results", function (req, response) {
    var searchData = req.query.name;
    request("http://www.omdbapi.com/?s="+searchData+"&apikey=thewdb", function (error,res,body) {
        if(!error && res.statusCode === 200) {
            var data = JSON.parse(body);
            if ('Error' in data){
                response.render("errorPage")
            } else {
                response.render("displayPage", {data: data})
            }
        }
    })
});

app.listen(3000);