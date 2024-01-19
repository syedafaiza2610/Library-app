import{auth , signInWithEmailAndPassword} from "./firebase.js";
const login = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    console.log(email.value, password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      if (user.email === "iamadmin@gmail.com") {
        location.href = "dashboard.html";
      } else {
        location.href = "store.html";
      }
    })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You are not registered, Register Yourself!",
              });
        });

}
let loginBtn = document.getElementById('loginBtn');
loginBtn && loginBtn.addEventListener('click', login)
