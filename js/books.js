import { collection, getDocs, db, where, query, doc, getDoc, } from "./firebase.js";
const urlParams = new URLSearchParams(window.location.search);
let pageSpinner = document.getElementById("page-spinner")
let main = document.getElementById("main")
const getStoreDetail = async () => {

    const storeName = document.getElementById("store-name");
    const storeAddress = document.getElementById("store-address");
    const storeDes = document.getElementById("store-description");
    const storeImage = document.getElementById("store-image1");
    const docRef = doc(db, "stores", urlParams.get('store'));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        storeName.innerHTML = docSnap.data().name;
        storeDes.innerHTML = docSnap.data().description;
        storeAddress.innerHTML = docSnap.data().address;
        storeImage.src = docSnap.data().image;
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
getStoreDetail();
let books = [];

const getAllBooks = async () => {
    const allBooks = document.getElementById("all-books");
    const q = query(collection(db, "books"), where("store", "==", urlParams.get("store")));
    const querySnapshot = await getDocs(q);
    allBooks.innerHTML = "";
    querySnapshot.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
        pageSpinner.style.display = "none"
        main.style.display = "block"
        allBooks.innerHTML += `
        <div class="card book-card w-100 mb-3">
        <div class="card-body">
            <div class="d-flex">
                <img class="book-img" src = "${doc.data().image}" alt="">
                <div class="p-3">
                    <h2 class="card-title"><b>${doc.data().name}</b></h2>
                    <p class="card-text">
                    <h4>Rs: ${doc.data().price}</h4> </p>

                </div>
            </div>
            <div class=" cart d-flex align-items-center gap-2">
                <button onclick = "quantity('-','${doc.id}')" class="qty-btn"><i class="fa-solid fa-minus"></i></button>
                <span id= '${doc.id}'class="fw-bold">1</span>
                <button onclick = "quantity('+','${doc.id}')" class="qty-btn"><i class="fa-solid fa-plus"></i></button>
                <a href="#" class="btn btn-primary" onclick ="addToCart('${doc.id}')">Add to cart</a>
            </div>

        </div>
    </div>
        `
    });
}
getAllBooks();
// incereament decreament

const quantity = (type, id) => {
    const qty = document.getElementById(id);
    if (Number(qty.innerHTML) < 2 && type === "-") {
        return;
    }
    if (type === "+") {
        qty.innerHTML = Number(qty.innerHTML) + 1
    }
    else {
        qty.innerHTML = Number(qty.innerHTML) - 1
    }

}
const addToCart = (id) => {
    const cartitems = localStorage.getItem("cart");
    const cart = cartitems ? JSON.parse(cartitems) : [];
    const qty = document.getElementById(id);
    const book = books.filter((v) => v.id === id);
    cart.push({ ...book[0], qty: Number(qty.innerHTML) });
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalAmount = document.getElementById("totalAmount");
    const total = cart.reduce((a, b) => a + Number(b.price) * b.qty, 0);
    console.log(total)
    totalAmount.innerHTML = `Rs: ${total + 250}`;
    console.log(totalAmount)
    getcart();
};

const deleteCart = (i) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    cartItems.splice(Number(i), 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
//     const totalAmount = document.getElementById("totalAmount");
// //     const total = cartItems.reduce((a, b) => a + Number(b.price) * b.qty, 0);
// //     totalAmount.innerHTML = `Rs ${total + 250} `;
  getcart();
  };

const getcart = () => {
    const cartitems = JSON.parse(localStorage.getItem('cart'));
    const cart = document.getElementById('cart')
    cart.innerHTML = "";
    if (cartitems) {
        for (var i = 0; i < cartitems.length; i++) {
            console.log(cartitems[i])
            cart.innerHTML +=
            `<div class="row g-0">
            <div class="col-md-4">
              <img src="${cartitems[i].image}" class="book-image2" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">${cartitems[i].name}</h3>
                <div>
                  <h5 class="card-title">Rs: ${cartitems[i].price} <br>
                      Quantity : ${cartitems[i].qty} <br>
                      Sub Total : ${cartitems[i].price * cartitems[i].qty} </h5>
                         <a href="#" onclick="deleteCart('${i}')" class="btn btn-primary">Remove</a> <hr>
                </div>
                <p class="card-text"></p>
                
              </div>
            </div>
          </div> `
        }
    }
}
getcart();

window.quantity = quantity;
window.addToCart = addToCart;
window.deleteCart = deleteCart;



