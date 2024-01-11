import { collection , getDocs , db , where , query , doc , getDoc,} from "./firebase.js";

const getAllBooks = async () => {
    const allBooks = document.getElementById("all-books");
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const q = collection(db, "books");
    
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