var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var publicDir = require("path").join(__dirname, "/public");

app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {
        name: "Ranu Kumbolo",
        city: "Malang",
        image: "/img/ranu-kumbolo.jpg"
    },
    {
        name: "Panderman",
        city: "Malang",
        image: "/img/panderman.jpg"
    },
    {
        name: "Coban Talun",
        city: "Malang",
        image: "/img/coban-talun.jpeg"
    },
    {
        name: "Ranca Upas",
        city: "Bandung",
        image: "/img/ranca-upas.jpg"
    },
    {
        name: "Gunung Puntang",
        city: "Bandung",
        image: "/img/puntang.jpg"
    },
    {
        name: "Situ Cileunca",
        city: "Bandung",
        image: "/img/situ-cileunca.jpg"
    },
    {
        name: "Situ Cisanti",
        city: "Bandung",
        image: "/img/situ-cisanti.jpg"
    },
    {
        name: "Ranca Upas",
        city: "Bandung",
        image: "/img/ranca-upas.jpg"
    },
    {
        name: "Gunung Putri",
        city: "Bandung",
        image: "/img/gunung-putri.jpg"
    },
]

app.get("/", function (req, res) {
    res.render("landing");
})

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var city = req.body.image;
    var newCampground = {name: name, image: image, city: city}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen(8080, function () {
    console.log("Camptastic telah launch");
})