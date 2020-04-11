var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var passportLocalMongoose = require("passport-local-mongoose");

var Product = require("./models/product");
var User = require("./models/user");

var indexRoutes = require("./routes/index");
var productRoutes = require("./routes/product");
var paperRoutes = require("./routes/paper");

mongoose.connect("mongodb://localhost/product_on_sale",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));




//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "ni btauga",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});


app.use(indexRoutes);
app.use(productRoutes);
app.use(paperRoutes);

app.listen(3000,function(req,res){
    console.log("Server is running");
});