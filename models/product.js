var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    sellor:String,
    image:String,
    price:String,
    discription:String,
    contact:String,
    hostel:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
});

module.exports= mongoose.model("Product",productSchema);