var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment =  require("./models/comment");

var data = [
    {
        name: "Cloud a Rest",
        image: "https://huaban.com/pins/1048396574/",
        description: "A campsite or camping pitch is a place used for overnight stay in an outdoor area. In UK English, a campsite is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this UK English use of the word is synonymous with the US English expression campground. In American English, the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites."
    },
    {
        name: "Canyon Floor",
        image: "https://unsplash.com/photos/gcCcIy6Fc_M",
        description: "Second one"
    },
    {
        name: "Desert Mesa",
        image: "https://unsplash.com/photos/7OM2GJ5l4qA",
        description: "Third one"
    }
]

function seedDB(){
    //Remove all comments
    Comment.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed comment!")
        }
    });
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed campgrounds!");
            //Add new campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("added a campground");
                        //Create a comment
                        Comment.create(
                            {
                                text: "This place is great!",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created a comment");
                                }
                            }
                        );
                    }
                });
            });
        }      
    });
}


module.experts = seedDB();