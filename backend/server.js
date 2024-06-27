require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const customerRoutes = require('./routes/customers')
const authRoutes = require('./routes/auth');
const resetPasswordRoutes = require('./routes/resetPassword')
const productRoutes = require('./routes/product')
const addressRoutes = require('./routes/addressRoutes')
const path = require('path');



const app = express()

//midlewaree
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Statik dosya servisi
app.use('/', express.static(path.join(__dirname, './frontend/public/index.html')));

//Routes
app.use('/customers', customerRoutes)
app.use('/auth', authRoutes)
app.use('/resetpassword', resetPasswordRoutes)
app.use('/products', productRoutes)
app.use('/address', addressRoutes)
// Değişiklik burada, dosya ismi doğru olmalı


//Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db')
            console.log('Listining on port' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


