const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        publicDir   = require("path").join(__dirname, "/public"),
        mongoose    = require("mongoose");

mongoose.connect('mongodb://localhost/camptastic', { useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
const camptasticSchema = new mongoose.Schema({
    name: String,
    city: String,
    image: String,
    description: String
});

const Campground = mongoose.model('Campground', camptasticSchema);

/*Campground.create(
    {
        name: "Ranu Kumbolo",
        city: "Malangg",
        image: "/img/ranu-kumbolo.jpg",
        description: "Ranu Kumbolo adalah sebuah danau air tawar yang sering menjadi tempat transit bagi para pendaki Gunung Semeru. Danau ini terletak di ketinggian 2.400 meter di atas permukaan laut. Danau Ranu Kumbolo juga merupakan sumber air bersih bagi para pendaki gunung semeru. Dengan debit air yang berlimpah, danau ini juga menjadi tempat berkumpulnya para pendaki untuk berkemah. Ranu Kumbolo berlokasi di kawasan Taman Nasional Bromo Tengger Semeru, tepatnya di antara kabupaten Malang dan Kabupaten Lumajang, Jawa Timur."
    }, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            console.log(`Newly Create Campground: ${campground}`);
        }
    }); */

const campgrounds = [
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
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});

app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const city = req.body.city;
    const image = req.body.image;
    const description = req.body.description;
    const newCampground = {name: name, city: city, image: image, description: description};
    // campgrounds.push(newCampground);
    // Create a new campground and save to the database
    Campground.create(newCampground, function(err, newlyCreatedCampground){
            if (err) {
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }
        })
    });
    // redirect back to campgrounds page
    

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.get("/campgrounds/:name", function(req, res) {
    // Tangkap ID
    // Temukan campground dengan id
    let name = req.params.name;
    Campground.findOne({name}, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("show", { campground : foundCampground });
        }
    })
})

app.listen(8080, function () {
    console.log("Camptastic telah launch");
})