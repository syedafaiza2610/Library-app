import { auth ,onAuthStateChanged } from "./firebase.js"



onAuthStateChanged(auth, (user) => {
    if (user) {
       if(user.email !== "iamadmin@gmail.com"){
        location.href ="login.html"
       }

    } else {
     location.href = "login.html"}
  });