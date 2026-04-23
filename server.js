const express = require('express')
const bodyparser = require('body-parser')
const db = require('./models')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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