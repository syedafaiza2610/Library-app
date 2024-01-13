import { collection, getDocs, db, where, query, doc, getDoc, } from "./firebase.js";
const urlParams = new URLSearchParams(window.location.search);
const getStoreDetail = async () => {
    
    const storeName = document.getElementById("store-name");
    const storeAddress = document.getElementById("store-address");
    const storeDes = document.getElementById("store-description");
    const storeImage = document.getElementById("store-image");
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

const getAllBooks = async () => {
    const allBooks = document.getElementById("all-books");
    const q = query(collection(db, "books"), where("store", "==", urlParams.get("store")));

    const querySnapshot = await getDocs(q);
    allBooks.innerHTML = ``
    querySnapshot.forEach((doc) => {
        allBooks.innerHTML += `
        <div class="card book-card w-100 mb-3">
        <div class="card-body">
            <div class="d-flex">
                <img class="book-img" src = "${doc.data().image}" alt="">
                <div class="p-3">
                    <h2 class="card-title"><b>${doc.data().name}</b></h2>
                    <p class="card-text">
                    <h3>Rs: ${doc.data().price}</h3>

                </div>
            </div>
            <div class=" cart d-flex align-items-center gap-2">
                <button class="qty-btn"><i class="fa-solid fa-minus"></i></button>
                <span class="fw-bold">1</span>
                <button class="qty-btn"><i class="fa-solid fa-plus"></i></button>
                <a href="#" class="btn btn-primary">Add to cart</a>
            </div>

        </div>
    </div>
        `
    });
}
getAllBooks();