import { database } from "/src/firebase-config.js";
import { collection, getDocs, addDoc, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {

    // Tüm tıklamaları dinle (Event Delegation)
    document.addEventListener("click", (event) => {
        const deleteButton = event.target.closest(".project-delete-btn");
        const editButton = event.target.closest(".project-edit-btn");

        if (deleteButton)
            del(deleteButton.getAttribute("data-id"));

        if (editButton)
            edit(editButton.getAttribute("data-id"));
    });

});

document.getElementById("project-add").addEventListener("click", function (event) {
    clearForm();
});

document.getElementById("project-form").addEventListener("submit", function (event) {
    event.preventDefault();
    save();
});

document.getElementById("project-add-image").addEventListener("click", function (event) {
    addImageInput("");
});

function clearForm() {
    document.getElementById("project-form").reset();
    document.getElementById("project-id").textContent = "-";
    document.getElementById("project-title").textContent = "";
    document.getElementById("project-description").textContent = "";
    document.getElementById("project-link").textContent = "";
    document.getElementById("project-image-list").innerHTML = "";
    document.getElementById("project-isActiveLabel").textContent = "Active";
    document.getElementById('project-isActive').checked = true;
}

function addImageInput(value = "") {
    const container = document.getElementById("project-image-list");

    const wrapper = document.createElement("div");
    wrapper.className = "input-group";

    wrapper.innerHTML = `
        <input name="imageHolder" type="text" class="form-control rounded-3 project-tag-input" value="${value}">
        <button type="button" class="btn btn-outline-danger rounded-3 ms-2" onclick="this.parentElement.remove()">
            <i class="bi bi-trash"></i>
        </button>
    `;

    container.appendChild(wrapper);
}

// Kaydetme — tüm veriyi toplar
function save() {
    const images = [...document.querySelectorAll(".project-tag-input")]
        .map(i => i.value.trim())
        .filter(v => v !== "");

    const id = document.getElementById("project-id").textContent;
    const data = {
        order: document.getElementById("project-order").value.trim(),
        isActive: document.getElementById("project-isActive").checked,
        title: document.getElementById("project-title").value.trim(),
        description: document.getElementById("project-description").value.trim(),
        link: document.getElementById("project-link").value.trim(),
        images: images  // ["tag1", "tag2", ...]
    };

    if (id == "-")
        add(data);
    else
        update(id, data);

    document.getElementById("project-form").reset();
}

async function add(data) {
    try {
        const docRef = await addDoc(collection(database, "projects"), data);
        alert(docRef.id + " Added!");
        window.location.reload();
    } catch (error) {
        console.error("Hata:", error);
    }
}

async function update(id, data) {
    try {
        const docRef = doc(database, "projects", id);
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
        const docRef = doc(database, "projects", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const project = {
                id: docSnap.id,
                ...docSnap.data()
            };

            document.getElementById("project-id").textContent = project.id;
            document.getElementById("project-title").value = project.title;
            document.getElementById("project-description").textContent = project.description;
            document.getElementById("project-link").value = project.link;
            document.getElementById("project-order").value = project.order;

            project.images.forEach(img => {
                addImageInput(img);
            });

            document.getElementById("project-isActiveLabel").textContent = project.isActive ? "Active" : "Passive";
            document.getElementById('project-isActive').checked = project.isActive;
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
            await deleteDoc(doc(database, "projects", id));
            alert(id + " Deleted!");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
}