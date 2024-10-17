const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection')

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8000;
//dotenv.config({path:'config.env'})

//log request
app.use(morgan('tiny'))
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended : true}))

//set view engine
app.set("view engine","ejs")

//load assests
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

//route

app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`server is listening to the ${PORT}`)
})