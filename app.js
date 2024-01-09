
import { auth , signInWithEmailAndPassword , db, collection , getDocs,} from  "./js/firebase.js"
const login = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    console.log(email.value , password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    if(user.email === "iamadmin@gmail.com"){
        location.href = "dashboard.html"
    }
    else{
          location.href = "index.html"
    }
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
       
}



const loginBtn = document.getElementById("loginBtn");

loginBtn && loginBtn.addEventListener("click", login)

const pageSpinner = document.getElementById("page-spinner");

const getAllstores = async () => {
  const storelist = document.getElementById("store-list");
  storelist.innerHTML = "";
  const q = collection(db, "stores");
  const querySnapshot = await getDocs(q);
  let index = 0;
  pageSpinner.style.display = "none";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    storelist.innerHTML += `
        <div class="col mb-4">
        <div class="card" style="width: 18rem;">
            <img src="${doc.data().image}"
                class="card-img-top" alt="..." loading="lazy">
            <div class="card-body">
                <h5 class="card-title">${doc.data().name}</h5>
                <p class="card-text">All variety are available
                </p>
                <a href="books.html?restaurant=${doc.id
      }" class="btn btn-primary">View All Books</a>
            </div>
        </div>
         </div>
        `;
  });
};
getAllstores();

// onAuthStateChanged(auth, (user) => {
//   if (
//     (user && location.pathname.indexOf("restaurants") !== -1) ||
//     location.pathname === "/"
//   ) {
//     getAllRestaurants();
//   }
// });
