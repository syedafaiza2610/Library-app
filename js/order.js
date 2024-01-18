import {
    storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs, serverTimestamp,
    doc, getDoc, updateDoc,
} from "./firebase.js";


const placeOrder = document.getElementById("placeOrder");
placeOrder.addEventListener("click", async () => {
    const customerName = document.getElementById("customerName");
    const customerContact = document.getElementById("customerContact");
    const customerAddress = document.getElementById("customerAddress");
    const cartdiv = document.getElementById("cart");
    const cart = JSON.parse(localStorage.getItem('cart'));
    const total = cart.reduce((a, b) => a + Number(b.price) * b.qty, 0);
    const totalAmount = document.getElementById("totalAmount");
    const closeBtn = document.getElementById("closeBtn");
    console.log(customerName.value, customerContact.value, customerAddress.value)
    console.log(cart)



    const orderDetails = {
        customerName: customerName.value,
        customerContact: customerContact.value,
        customerAddress: customerAddress.value,
        status: "pending",
        cart,
        timestamp: serverTimestamp(),
        orderAmount: total,
        deliveryCharges: 250,
        totalAmount: total + 250,
    };
    await addDoc(collection(db, "orders"), orderDetails);
    Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Your order has been placed",
        showConfirmButton: false,
        timer: 1500,
    });
      customerName.value = "";
      customerContact.value = "";
      customerAddress.value = "";
      localStorage.removeItem("cart");
      cartdiv.innerHTML = "";
      totalAmount.innerHTML = "";
      closeBtn.click();
});
