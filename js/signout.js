

import { auth , signOut } from "./firebase.js";

const explorebtn = document.getElementById('explore')
explorebtn.addEventListener("click", () => {
  const user = auth.currentUser;
  if (!user) {
    Swal.fire({
      title: "For Exploring Stores You need To Login First",
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
    setTimeout(() => { window.location = "login.html"
      
    }, 3000);
    
    
  } else {
    // If the user is logged in, redirect to the stores page
    window.location.href = "store.html";
  }
});



let logOut = () => {
    signOut(auth).then(() => {
        console.log('Signout Successfully')
        window.location = "login.html"

    })
    .catch((error) => {
        console.log(error)
    
    })
  }

    let logoutBtn = document.getElementById('logoutBtn');
   logoutBtn && logoutBtn.addEventListener('click' ,logOut)