import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import temprature from './router/index.js'
import user from './router/user.js'

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));



app.use('/',temprature)
app.use('/sign',user)

const PORT = process.env.PORT || 8888

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen((PORT), () => console.log(`server running on Port:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`))

// torfun temp olcen 
// torfun rutubet olcen
// parnikin temp olcen
// parnikin rutubet olcen
// suyun azalib coxalmasi 
// kamera nezaret 
// suyun dovr etme tezliyi 