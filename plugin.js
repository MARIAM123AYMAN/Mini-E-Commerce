let footer = document.querySelector("footer");
let shop = document.getElementById("shops");
let landing = document.querySelector(".landing");

let about = document.getElementById("about");
let contact = document.getElementById("contact");

let car = document.getElementById("car");
let cart = document.getElementById("cart");
let btnCart = document.getElementById("btnCart");
car.addEventListener("click", ()=>{
    cart.style.display = "block";
});
btnCart.addEventListener("click", ()=>{
    cart.style.display="none"
})
let productMan = document.getElementById("cardsMan");
let productWoman = document.getElementById("cardsWoman");
async function fetchData() {
    let data = await fetch("products.json");
    var response = await data.json();
    // console.log(response);
    allProducts = response;
    let menProducts  = response.filter(ele =>ele.imageMan).slice(0,3);
    let womanProducts  = response.filter(ele =>ele.imageWoman).slice(0,3);
    menProducts.forEach(element => {
        productMan.innerHTML+=` 
                        <div class="card" >
                            <img src="${element.imageMan}" onclick="show(${element.id})" id="cardImg" alt="" >
                            <div class="txt">
                            <h3>${element.name}</h3>
                            <p>${element.price}$</p>
                            <button onclick="add(${element.id})">Add To Cart</button>
                            </div>
                            </div>
                            `
    })
    womanProducts.forEach(element=>{
        
        productWoman.innerHTML+=` 
        <div class="card" >
        <img src="${element.imageWoman}" onclick="show(${element.id})"  alt="" >
        <div class="txt">
        <h3>${element.name}</h3>
        <p>${element.price}$</p>
        <button onclick="add(${element.id})">Add To Cart</button>
        </div>
                    </div>    
        `
    })
}
fetchData();                  
let arr = [];
let content = document.getElementById("content");
function add(id) {
    console.log(id);
    let newProduct = allProducts.find(ele=>ele.id === id);
    let here = arr.find(ele=>ele.id === id);
    if(here){
        alert("this product is here");
    }
    else{
        arr.push(newProduct);
        let contentItem = document.createElement("div");
        let productImage = newProduct.imageMan|| newProduct.imageWoman;
        contentItem.innerHTML+=`
        <div class="contentItem">
                <img src="${productImage}" alt="">
                <h4>${newProduct.name}</h4>
                <p>${newProduct.price}$</p>
                <span id="delete" style="cursor:pointer"  onclick="delate(${newProduct.id},this)" >Delete</span>
            </div>
        `
        content.appendChild(contentItem);
        alert("product is added")
    }
}

function delate(id, ele) {
    ele.parentElement.remove();
        arr = arr.filter(product => product.id !== id)
    };

let fullPage = document.getElementById("fullPage");
let cartImg = document.getElementById("cartImg");
async function show(id) {
    console.log(id);
    let data = await fetch("products.json");
    let response = await data.json();
    let product = response.find(ele=> ele.id === id)
    // let menProducts  = product.filter(ele =>ele.imageMan).slice(0,3);
    // let womanProducts  = product.filter(ele =>ele.imageWoman).slice(0,3);
    let productImage = product.imageMan|| product.imageWoman;
    fullPage.innerHTML = `
        <img id="cartImg" src="${productImage}" alt="">
        <div class="cartText">
            <h1>Trends Offer : Trending Shop <br> Now</h1>
            <h2>Special Price</h2>
            <h2>${product.price}</h2>
            <h2>${product.name}</h2>
            <div class="btn">
                <button onclick="add(${product.id})" >Add To Cart</button>
                <button class="relode" onclick="location.reload()"> Back </button>
            </div>
            
        </div>
        `
        landing.style.display="none";
        footer.style.display="none";
        shop.style.display="none";
        about.style.display="none";
        contact.style.display="none"
        fullPage.style.display="flex"
    }
    function shops() {
    landing.style.display="none";
    footer.style.display="block";
    shop.style.display="block";
    about.style.display="none";
    contact.style.display="none"
    fullPage.style.display="none"
}
    function abouts() {
    landing.style.display="none";
    footer.style.display="block";
    shop.style.display="none";
    about.style.display="block";
    contact.style.display="none"
    fullPage.style.display="none"
}
    function contacts() {
    landing.style.display="none";
    footer.style.display="block";
    shop.style.display="none";
    about.style.display="none";
    contact.style.display="block"
    fullPage.style.display="none"
}