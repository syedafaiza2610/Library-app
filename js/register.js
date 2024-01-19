
import { auth, createUserWithEmailAndPassword } from "./firebase.js";
const register = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    console.log(email.value, password.value);
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {

            const user = userCredential.user;
            console.log("user", user)
            let timerInterval;
            Swal.fire({
                title: "You are succesfully registered!",
                html: "I will close in <b></b> milliseconds.",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });


        })
        .catch((error) => {
            Swal.fire({
                title: "You are Already Registered",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
        });

}
let registerBtn = document.getElementById('registerBtn');
registerBtn && registerBtn.addEventListener('click', register)