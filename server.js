const express = require('express')
const bodyparser = require('body-parser')
const db = require('./models')
require('dotenv').config()

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/', require("./routes/user.routes"));
app.use('/seller', require("./routes/seller.routes"));
app.use('/admin', require("./routes/admin.routes"));

db.sequelize.authenticate().then(() => {
    console.log('Database connected ✅')
    app.listen(process.env.PORT, () => {
        console.log('Server started on port 5000✅')
    })
}).catch(err => {
    console.log(err)
})