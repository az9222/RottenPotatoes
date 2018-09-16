var express = require("express");
var request = require("request");
var app = express();
app.use(express.static("public")); 
app.set("view engine", "ejs");

const port = process.env.port || 3000;
app.listen(port, function(){
    console.log(`Server initiated on port ${port}`);
})

app.get("/", function(req, res){
    res.render("search");
})

app.get("/results", function(req, res) {
    var query = req.query.search.toLowerCase();
    var url = `http://www.omdbapi.com/?apikey=d886f1cf&s=${query}`;
    request(url, function (error, response, body){
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            if(!data.Search) {
                res.render("notAvailable");
            } else {
                res.render("results", {data: data, title: query})
            }
        } 
    });
});

app.get('/movieInfo', function(req, res) {
    var movieID = req.query.id;
    let siteURL = `http://www.omdbapi.com/?apikey=d886f1cf&i=${movieID}&plot=full`
    request(siteURL, function(error, response, body){
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("summary", {data: data})
        }
    })
})



