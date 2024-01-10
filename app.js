
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


const getAllstores = async () => {
  const storelist = document.getElementById("store-list");
  storelist.innerHTML = "";
  const q = collection(db, "stores");
  const querySnapshot = await getDocs(q);
  let index = 0;
  querySnapshot.forEach((doc) => {
      console.log(doc.id, " = ", doc.data());
      index++
      storelist.innerHTML += `
      <div class="col">
          <div class="cardcat" style="width: 19rem;">
              <img src= "${doc.data().image}"class="card-img-top" alt="...">
              <div class="card-body text-center">
                  <h5 class="card-title"><b>${doc.data().name}</b></h5>
                  <p class="card-text">"
                  ${doc.data().description}"</p>
                  <a href ="books.html" class="btn btn-primary">View All Books</a>
              </div>
          </div>
      </div>`
  });
}
getAllstores();