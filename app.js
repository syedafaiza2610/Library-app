
import { auth , signInWithEmailAndPassword} from  "./js/firebase.js"
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