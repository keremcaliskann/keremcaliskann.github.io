import { database } from "/src/firebase-config.js";
import { collection, getDocs, addDoc, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

let lastOrder = 0;

document.addEventListener("DOMContentLoaded", () => {

    // Tüm tıklamaları dinle (Event Delegation)
    document.addEventListener("click", (event) => {
        const deleteButton = event.target.closest(".product-delete-btn");
        const editButton = event.target.closest(".product-edit-btn");

        if (deleteButton)
            del(deleteButton.getAttribute("data-id"));

        if (editButton)
            edit(editButton.getAttribute("data-id"));
    });

    checkSize();
});

async function checkSize() {
    const productsRef = collection(database, "products");
    const snapshot = await getDocs(productsRef);
    lastOrder = snapshot.size + 1;
}

document.getElementById("product-add").addEventListener("click", function (event) {
    clearForm();
});

document.getElementById("product-form").addEventListener("submit", function (event) {
    event.preventDefault();
    save();
});

document.getElementById("product-add-image").addEventListener("click", function (event) {
    addImageInput("");
});

function clearForm() {
    document.getElementById("product-form").reset();
    document.getElementById("product-order").value = lastOrder;
    document.getElementById("product-id").textContent = "-";
    document.getElementById("product-title").value = "";
    document.getElementById("product-description").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-image-list").innerHTML = "";
    document.getElementById("product-isActiveLabel").textContent = "Active";
    document.getElementById('product-isActive').checked = true;
}

function addImageInput(value = "") {
    const container = document.getElementById("product-image-list");

    const wrapper = document.createElement("div");
    wrapper.className = "input-group";

    wrapper.innerHTML = `
        <input name="imageHolder" type="text" class="form-control rounded-3 product-tag-input" value="${value}">
        <button type="button" class="btn btn-outline-danger rounded-3 ms-2" onclick="this.parentElement.remove()">
            <i class="bi bi-trash"></i>
        </button>
    `;

    container.appendChild(wrapper);
}

// Kaydetme — tüm veriyi toplar
function save() {
    const images = [...document.querySelectorAll(".product-tag-input")]
        .map(i => i.value.trim())
        .filter(v => v !== "");

    const id = document.getElementById("product-id").textContent;
    const data = {
        order: Number(document.getElementById("product-order").value.trim()) || 0,
        isActive: document.getElementById("product-isActive").checked,
        title: document.getElementById("product-title").value.trim(),
        description: document.getElementById("product-description").value.trim(),
        price: parseFloat(document.getElementById("product-price").value.trim()) || 0,
        images: images  // ["tag1", "tag2", ...]
    };

    if (id == "-")
        add(data);
    else
        update(id, data);

    document.getElementById("product-form").reset();
}

async function add(data) {
    try {
        const docRef = await addDoc(collection(database, "products"), data);
        alert(docRef.id + " Added!");
        window.location.reload();
    } catch (error) {
        console.error("Hata:", error);
    }
}

async function update(id, data) {
    try {
        const docRef = doc(database, "products", id);
        const docSnap = await updateDoc(docRef, data);
        alert(docRef.id + " Updated!");
        window.location.reload();
    } catch (error) {
        console.error("Hata:", error);
    }
}

async function edit(id) {
    clearForm();

    try {
        const docRef = doc(database, "products", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const product = {
                id: docSnap.id,
                ...docSnap.data()
            };

            document.getElementById("product-id").textContent = product.id;
            document.getElementById("product-title").value = product.title;
            document.getElementById("product-description").value = product.description;
            document.getElementById("product-price").value = product.price;
            document.getElementById("product-order").value = product.order;

            product.images.forEach(img => {
                addImageInput(img);
            });

            document.getElementById("product-isActiveLabel").textContent = product.isActive ? "Active" : "Passive";
            document.getElementById('product-isActive').checked = product.isActive;
        } else {
            console.error("ID: " + id + " not found!");
        }
    }
    catch (error) {
        console.error("Hata:", error);
    }
}

async function del(id) {
    console.log(id);
    const isConfirmed = confirm("SURE?");
    if (isConfirmed) {
        try {
            await deleteDoc(doc(database, "products", id));
            alert(id + " Deleted!");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
}