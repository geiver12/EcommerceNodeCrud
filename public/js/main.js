var products = []
var carItems = []
var cart_n = document.getElementById('cart_n')

const fruitDIV = document.getElementById('fruitDIV')
const juiceDIV = document.getElementById('juiceDIV')
const saladDIV = document.getElementById('saladDIV')


const FRUIT = [
    { name: 'Apple', price: 1 },
    { name: 'Orange', price: 1 },
    { name: 'Cherry', price: 1 },
    { name: 'Strawberry', price: 1 },
    { name: 'Kiwi', price: 1 },
    { name: 'Banana', price: 1 }
]

const JUICE = [
    { name: 'Juice #1', price: 10 },
    { name: 'Juice #2', price: 11 },
    { name: 'Juice #3', price: 12 }
]
const SALAD = [
    { name: 'Salad #1', price: 11 },
    { name: 'Salad #2', price: 12 },
    { name: 'Salad #3', price: 13 }
]

const HTMLfruitProduct = (con) => {
    let URL = `../images/fruits/fruit${con}.jpeg`
    let btn = `btnFruit${con}`
    return `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
            <div class="card-body">
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <p class="card-text"> ${FRUIT[con-1].name}</p>
                <p class="card-text">Price:${FRUIT[con-1].price}.00</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" onclick="cart2('${FRUIT[con-1].name}','${FRUIT[con-1].price}',
                        '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">
                        <a style="color:inherit;" href="/cart">Buy</a></button>
                        <button id="${btn}" type="button" onclick="cart('${FRUIT[con-1].name}','${FRUIT[con-1].price}',
                        '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                    </div>
                    <small class="text-muted">Free Shipping </small>
                </div>
            </div>
        </div>
    </div>
    `
}


const HTMLjuiceProduct = (con) => {
    let URL = `../images/juice/juice${con}.jpeg`
    let btn = `btnJuice${con}`
    return `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
            <div class="card-body">
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <p class="card-text"> ${JUICE[con-1].name}</p>
                <p class="card-text">Price:${JUICE[con-1].price}.00</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" onclick="cart2('${JUICE[con-1].name}','${JUICE[con-1].price}',
                        '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">
                        <a style="color:inherit;" href="/cart">Buy</a></button>
                        <button id="${btn}" type="button" onclick="cart('${JUICE[con-1].name}','${JUICE[con-1].price}',
                        '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                    </div>
                    <small class="text-muted">Free Shipping </small>
                </div>
            </div>
        </div>
    </div>
    `
}

const HTMLsaladProduct = (con) => {
    let URL = `../images/salads/salad${con}.jpeg`
    let btn = `btnSalad${con}`
    return `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
            <div class="card-body">
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <i style="color:orange;" class="fa fa-star"></i>
                <p class="card-text"> ${SALAD[con-1].name}</p>
                <p class="card-text">Price:${SALAD[con-1].price}.00</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" onclick="cart2('${SALAD[con-1].name}','${SALAD[con-1].price}',
                        '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">
                        <a style="color:inherit;" href="/cart">Buy</a>
                        </button>
                        <button id="${btn}" type="button" onclick="cart('${SALAD[con-1].name}','${SALAD[con-1].price}',
                        '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to Cart
                        </button>
                    </div>
                    <small class="text-muted">Free Shipping </small>
                </div>
            </div>
        </div>
    </div>
    `
}

const animation = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Your Product is add!!'
    })


}

const cart = (name, price, url, con, btncart) => {
    const item = {
        name: name,
        price: price,
        url: url
    }
    carItems.push(item)

    let storage = JSON.parse(localStorage.getItem("cart"))

    if (storage == null) {
        products.push(item)
        localStorage.setItem("cart", JSON.stringify(products))
    } else {
        products = JSON.parse(localStorage.getItem("cart"))
        products.push(item)
        localStorage.setItem("cart", JSON.stringify(products))
    }
    products = JSON.parse(localStorage.getItem("cart"))
    cart_n.innerHTML = `[${products.length}]`
    document.getElementById(btncart).style.display = "none"
    animation()
}

const cart2 = (name, price, url, con, btncart) => {

    const item = {
        name: name,
        price: price,
        url: url
    }
    carItems.push(item)

    let storage = JSON.parse(localStorage.getItem("cart"))

    if (storage == null) {
        products.push(item)
        localStorage.setItem("cart", JSON.stringify(products))
    } else {
        products = JSON.parse(localStorage.getItem("cart"))
        products.push(item)
        localStorage.setItem("cart", JSON.stringify(products))
    }
    products = JSON.parse(localStorage.getItem("cart"))
    cart_n.innerHTML = `[${products.length}]`
    document.getElementById(btncart).style.display = "none"

}

(() => {

    for (let index = 1; index <= 6; index++) {
        fruitDIV.innerHTML += `${HTMLfruitProduct(index)}`

    }
    for (let index = 1; index <= 3; index++) {
        juiceDIV.innerHTML += `${HTMLjuiceProduct(index)}`
        saladDIV.innerHTML += `${HTMLsaladProduct(index)}`

    }
    if (localStorage.getItem("cart") == null) {

    } else {
        products = JSON.parse(localStorage.getItem("cart"))
        cart_n.innerHTML = `[${products.length}]`

    }
})()