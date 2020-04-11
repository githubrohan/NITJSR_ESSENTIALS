var express = require("express");
var router = express.Router();

//SEMESTER PAPERS
router.get("/papers",function(req,res){
    res.render("papers");
})

module.exports = router;