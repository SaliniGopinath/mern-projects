import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    userId:{type:String,required:true},
    productId:{type:String,required:true},
    productname:{type:String,required:true},
    price:{type:String,required:true},
    quantity:{type:String,required:true}
})


export default mongoose.model('Cart',cartSchema);