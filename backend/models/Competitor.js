const mongoose=require('mongoose');

const competitorPriceSchema=new mongoose.Schema({
    productId:{
    type:String,
    required:true,
    },
    competitor:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now,
    })

    module.exports=mongoose.model('CompetitorPrice',competitorPriceSchema);