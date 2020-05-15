const mongoose = require('mongoose')
const express = require('express')

const Order = mongoose.model('Order')

var router = express.Router()

mongoose.set('useFindAndModify', false)

router.get('/', (req, res) => {
    res.render('menu')
})

router.get('/cart', (req, res) => {
    res.render('cart')
})

router.get('/orders', (req, res) => {
    res.render('orders')
})

router.get('/admin', (req, res) => {
    Order.find((err, doc) => {
        if (!err) {
            res.render("admin", { orders: doc })
        } else {
            console.log('Error :: ', err)
        }
    })
})

router.get('/order/:id', (req, res) => {
    console.log('entra')
    Order.findById(req.params.id, (err, doc) => {

        if (!err) {
            res.render("orders", { order: doc })
        } else {
            console.log('Error findById:: ', err)
        }
    })
})

router.get('/order/delete/:id', (req, res) => {
    console.log('entra in delete')
    Order.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin')
        } else {
            console.log('Error in Delete:: ', err)
        }
    })
})

router.post('/cart', (req, res) => {
    insertOrder(req, res)
})

router.post('/order', (req, res) => {
    updateOrder(req, res)
})

const updateOrder = (req, res) => {
    Order.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/admin')
        } else {
            console.log('Update error:: ', err)
        }
    })
}

const insertOrder = (req, res) => {
    const d = new Date()
    const t = d.getTime()
    var counter = t
    counter += 1
    var order = new Order()
    order.total = req.body.total
    order.order = counter
    order.save((err, doc) => {
        if (!err) {
            console.log('order:', order)
            res.redirect('/admin')
        } else {
            console.log('error insertOrder:', err)
        }
    })
}

module.exports = router