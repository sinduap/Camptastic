var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var publicDir = require("path").join(__dirname, "/public");
app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
})

app.get("/campgrounds", function (req, res) {
    var campgrounds = [
        {
            name: "Ranu Kumbolo",
            image: "/img/RanuKumbolo.jpg"
        },
        {
            name: "Panderman",
            image: "/img/Panderman.jpg"
        },
        {
            name: "Coban Talun",
            image: "/img/CobanTalun.jpeg"
        }
    ]
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res) {
    res.send("You've start");
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen(8080, function () {
    console.log("Camptastic telah launch");
})