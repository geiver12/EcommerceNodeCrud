require('./models/db')

const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const Handlebars = require('handlebars');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const orderController = require('./controllers/orderController')

var app = express()

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.use(express.static(path.join(__dirname, '/public')))

app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

app.set('view engine', 'hbs')

app.listen(3001, () => {
    console.log('Server on Port::3001 ')
})

app.use('/', orderController)