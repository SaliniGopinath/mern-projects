
import express from 'express';
import logger from 'morgan';
import user from './routes/userRoutes.js';
import admin from './routes/adminRoutes.js';
import cart from './routes/cartRoutes.js';
import order from './routes/orderRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from './config/database.js'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use("/files", express.static(path.join(__dirname, "public/files")));
mongoose.connection.on('error', console.error.bind(console,'mongodb connection error'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
}));

app.use('/user',user);
app.use('/admin',admin);
app.use('/cart',cart);
app.use('/order',order);
// app.listen(4000,function(){
//     console.log('Node server listening on port 4000')
// });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Node server listening on port ${PORT}`);
});


