const mongoose = require("mongoose");

//SCHEMA SETUP
const camptasticSchema = new mongoose.Schema({
    name: String,
    city: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model('Campground', camptasticSchema);