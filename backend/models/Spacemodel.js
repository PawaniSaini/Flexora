const {Schema,model }=require('../connection');

const mySchema=new Schema({
    title:String,
    description:String,
    price:{ type:String,required:true},
    features:String,
    image:String,
    area:Number,
    facilities:String,
    address:String,
    review:String,
    createdAt:{ type:Date,dafault:Date.now}
});

module.exports=model('space',mySchema);
