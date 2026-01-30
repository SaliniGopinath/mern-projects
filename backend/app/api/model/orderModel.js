import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    userId:{type:String,required:true},
    cartItems:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:String,required:true}
})


export default mongoose.model('Order',orderSchema);