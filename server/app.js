require('dotenv').config();
const cors = require('cors')

const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/user')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',userRoutes)

app.listen(port, ()=> {
    console.log(`listening on port : ${port}`)
})