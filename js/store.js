import {storage , ref , uploadBytesResumable , getDownloadURL} from "./firebase.js"


const logo = document.getElementById("store-logo");

const selectedlogo = document.getElementById("selected-logo");
let file;
logo.addEventListener("change",(e) => {
    file = e.target.files[0];
    selectedlogo.style.display="block";
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
const submitstore = document.getElementById("submit-store");

submitstore.addEventListener("click", async () =>{
    const name = document.getElementById("store-name");
    const address = document.getElementById("store-address");
    const image = await uploadFile(file, name.value)
    console.log(image)
 
 })
