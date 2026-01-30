import mongoose from 'mongoose'
const mongodb = 'mongodb://localhost:27017/FreshPlateDatabase';
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
export default mongoose;
