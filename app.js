
import { auth , db , collection , getDocs, onAuthStateChanged , signOut} from  "./js/firebase.js"
const storelist = document.getElementById("store-list");
const pagespinner = document.getElementById("page-spinner");
const getAllstores = async () => {
  // const storelist = document.getElementById("store-list");
  // const pagespinner = document.getElementById("page-spinner");
  storelist.innerHTML = "";
  const q = collection(db, "stores");
  const querySnapshot = await getDocs(q);
  let index = 0;
  pagespinner.style.display = "none"
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
                  <a href ="books.html?store=${doc.id}" class="btn btn-primary">View All Books</a>
                  <br>
              </div>
          </div>
      </div>`
  });
}
getAllstores();
