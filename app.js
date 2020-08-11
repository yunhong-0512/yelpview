var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User       = require("./models/user")
//var seedDB     = require("./seeds");

//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")


mongoose.connect("mongodb://127.0.0.1:27017/yelpcamp",{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));
//mongodb+srv://root:13676600500HGq@cluster0.macsf.azure.mongodb.net/yelpcamp?retryWrites=true&w=majority
//mongodb+srv://yunhong:854698892@yelpcamp-ghbnl.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://root:13676600500HGq@cluster0.macsf.azure.mongodb.net/yelpcamp?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "ABCDEFG",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.locals.moment = require('moment');

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});