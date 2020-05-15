const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ecommerceOrders', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB is Connected!')
    } else {
        console.log('err::', err)
    }
})

require('./order.model')