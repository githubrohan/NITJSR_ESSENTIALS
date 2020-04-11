var express = require("express");
var router = express.Router({mergeParams:true});
var Product = require("../models/product");
var methodOverride = require("method-override");
router.use(methodOverride("_method"));

//PRODUCT ROUTES
router.get("/products",isLoggedIn,function(req,res){
    Product.find({},function(err,products){
        if(err)
        {
            console.log(err);
        }else{
            res.render("products",{products:products});
        }
    })
    
})
router.get("/products/new",isLoggedIn,function(req,res){
    res.render("new");
})
router.post("/products",isLoggedIn,function(req,res){
    var sellor = req.body.sellor;
    var image = req.body.image;
    var price = req.body.price;
    var contact = req.body.contact;
    var hostel = req.body.hostel;
    var discription =req.body.discription;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newProduct = {sellor:sellor,image:image,price:price,contact:contact,hostel:hostel,discription:discription,author:author};
    Product.create(newProduct,function(err,products){
        if(err){
            console.lod(err);
        }else{
            res.redirect("/products");
        }
    });
});
router.get("/products/:id",isLoggedIn,function(req,res){
    Product.findById(req.params.id,function(err,product){
        if(err)
        {
            console.log(err);
        }else{
            res.render("buy",{product:product});
        }
    })
});
router.get("/products/:id/edit",checkProductOwner,function(req,res){

        Product.findById(req.params.id,function(err,foundProduct){
            if(err){
                res.redirect("/products");
            }else{
                res.render("edit",{product:foundProduct});
            }
            });    
    
});
router.put("/products/:id",checkProductOwner,function(req,res){
    Product.findByIdAndUpdate(req.params.id,req.body.pro,function(err,updatedProduct){
        if(err){
            res.redirect("/products");
        }else{
            res.redirect("/products/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/products/:id",checkProductOwner,function(req,res){
    Product.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/products");
        }else{
            res.redirect("/products");
        }
    });
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

function checkProductOwner(req,res,next){
    if(req.isAuthenticated()){
        Product.findById(req.params.id,function(err,foundProduct){
            if(err){
                res.redirect("back");
            }else{
                if(foundProduct.author.id.equals(req.user._id)){
                   next();
                }else{
                    res.redirect("back");
                }  
            }
        });
    }else{
        res.redirect("back");
    };
}

module.exports = router;