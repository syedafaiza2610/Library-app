
import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection , addDoc , getDocs } from "./firebase.js"

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

const getAllStores = async () => {
    try {
        const q = collection(db, "stores");
        const querySnapshot = await getDocs(q);
        const resSelect = document.getElementById("store-name");
        let index = 0;
        let allStores = [];
        resSelect.innerHTML = `<option selected>Select Store</option>`
        querySnapshot.forEach((doc) => {
            allStores.push({ ...doc.data(), id: doc.id })
            index++
            resSelect.innerHTML += `
            <option value="${doc.id}">${doc.data().name}</option>
            `
        });
        return new Promise((resolve, reject) => {
            resolve(allStores)
        })
    } catch (err) {
        console.log("err", err)
    }
}

getAllStores()

const getAllBooks = async () => {
    const stores = await getAllStores();
    const allBooks = document.getElementById("all-books");
    const q = collection(db, "books");
    const querySnapshot = await getDocs(q);
    let index = 0;
    let storeNames = {};
    for (var i = 0; i < stores.length; i++) {
        storeNames[stores[i].id] = stores[i].name
    }
    console.log("storeNames", storeNames)
    allBooks.innerHTML = ``
    querySnapshot.forEach((doc) => {
        index++;
        allBooks.innerHTML += `
                     <tr>
                        <th scope="row">${index}</th>
                        <td><img class="book-image1" src="${doc.data().image}" alt=""></td>
                        <td>${doc.data().name}</td>
                        <td>${doc.data().price}</td>
                        <td>${storeNames[doc.data().store]}</td>
                    </tr>
        `
    });
}

getAllBooks();

const addBooks = document.getElementById("addBooks");

addBooks.addEventListener('click', async () => {
    const closeBtn = document.getElementById("close-btn")
    const spinner = document.getElementById("book-spinner");
    const storeName = document.getElementById("store-name");
    const bookName = document.getElementById("book-name");
    const bookPrice = document.getElementById("book-price");
    const bookImage = document.getElementById("book-image");
    spinner.style.display = "block"
    const image = await uploadFile(bookImage.files[0], bookName.value)
    const bookDetail = {
        store: storeName.value,
        name: bookName.value,
        price: bookPrice.value,
        image
    }
    const docRef = await addDoc(collection(db, "books"), bookDetail);
    storeName.value = "";
    bookName.value = "";
    bookPrice.value = "";
    bookImage.value = "";
    spinner.style.display = "none"
    closeBtn.click()
    getAllBooks()
    console.log(docRef)
})
