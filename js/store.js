import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc , query , where , getDocs  } from "./firebase.js"


const logo = document.getElementById("store-logo");
const selectedlogo = document.getElementById("selected-logo");
let file;
logo.addEventListener("change", (e) => {
    file = e.target.files[0];
    selectedlogo.style.display = "block";
    selectedlogo.src = URL.createObjectURL(e.target.files[0]);
})


let uploadFile = (file, name) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${name.split(" ").join("-")}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })
}

const getAllstores = async () => {
    const storelist = document.getElementById("store-list");
    storelist.innerHTML = "";
    const q = collection(db, "stores");
    const querySnapshot = await getDocs(q);
    let index = 0;
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        index++
        storelist.innerHTML += `
                    <tr>
                        <th scope="row">${index}</th>
                        <td><img class="store-logo-image" src="${doc.data().image}" alt=""></td>
                        <td>${doc.data().name}</td>
                        <td>${doc.data().address}</td>
                        <td>${doc.data().description}</td>
                        
                    </tr>
        `
    });
}

getAllstores()

const submitstore = document.getElementById("submit-store");

submitstore.addEventListener('click', async () => {
    const spinner = document.getElementById("store-spinner");
    const name = document.getElementById("store-name");
    const closeBtn = document.getElementById("close-btn")
    const address = document.getElementById("store-address");
    const description = document.getElementById("store-des");
    spinner.style.display = "block"
    const image = await uploadFile(file, name.value)
    const docRef = await addDoc(collection(db, "stores"), {
        name: name.value,
        address: address.value,
        description: description.value,
        image
       
    });
    spinner.style.display = "none"
    name.value = "";
    address.value = "";
    logo.value = "";
    selectedlogo.style.display = "none";
    console.log("Document written with ID: ", docRef.id);
    getAllstores();

    closeBtn.click();
  
})


    export { uploadFile };