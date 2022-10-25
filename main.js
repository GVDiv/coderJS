//vaeriables

let allContainerCart = document.querySelector('.productos');
let containerBuyCart = document.querySelector('.cartProducts');
let priceTotal = document.querySelector('.priceTotal');
let amountProduct = document.querySelector('.countProduct');

let buyThings = [];
let totalCard = 0;
let totalCountProduct = 0;

//Funciones
loadEventListeners();
function loadEventListeners(){
    allContainerCart.addEventListener('click', addProducts);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProducts(event){
    event.preventDefault();
    if(event.target.classList.contains('cardBtn')){
        const selectProduct = event.target.parentElement;
        readContent(selectProduct);
        // console.log(event.target.parentElement);
    }
}

function deleteProduct(event){
    if(event.target.classList.contains('deleteProduct')){
        const deleteId = event.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if(value.id == deleteId) {
                let priceReduce =  parseFloat(value.price) * parseFloat(value.amount);
                totalCard = totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        })
        buyThings = buyThings.filter(product => product.id !== deleteId);

        totalCountProduct --;
    }
    if(buyThings.length === 0){
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }

    loadHtml();
}

function readContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.cardTitle').textContent,
        price: product.querySelector('.cardPrice').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if(exist){
        const item = buyThings.map(product => {
            if(product.id === infoProduct.id) {
                product.amount++;
                return product
            } else {
                return product
            }
        });
        buyThings = [...item];
    } else {
        buyThings = [...buyThings, infoProduct];
        totalCountProduct++;
    }
    loadHtml();
    console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {title, image, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = 
        `
            <span>${title}</span>
            <div class="item-content">
                <img src="${image}" alt=""> 
                <h5 class="cartPrice">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="deleteProduct" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = totalCountProduct;
    });
}

function clearHtml(){
    containerBuyCart.innerHTML = '';
}
function btnClose(){
    document.getElementById("cartClose").style.display = "none";
}
function showCart(x){
    document.getElementById("cartShow").style.display = "block";
}