import { database } from "/src/firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import projectItem from '/src/projectItem.html?raw';

const projectsTable = document.getElementById('projects-table');
let allProjects = [];
// 1. Firebase'den Verileri Çek
export async function fetchProjects() {
  try {
    const querySnapshot = await getDocs(collection(database, "projects")); // Firestore'daki koleksiyon adın

    // Gelen veriyi bizim kullanabileceğimiz bir diziye (array) çevir
    allProjects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Ürünleri ekrana bas
    renderProjects(allProjects);

  } catch (error) {
    console.error("Firebase'den ürünler çekilemedi:", error);
  }
}

// 2. Ürünleri HTML'e Çevirip Ekrana Bas
async function renderProjects(projectsToRender) {
  // Önce grid'in içini temizle
  projectsTable.innerHTML = '';

  // Eğer ürün yoksa uyarı göster
  if (projectsToRender.length === 0) {
    projectsTable.innerHTML = `<div class="col-12 text-center text-secondary py-5">Aradığınız kriterde ürün bulunamadı.</div>`;
    return;
  }

  const templateData = projectItem;

  // Her bir ürün için HTML kartı oluştur
  const projectsHTML = projectsToRender.map(project => {
    // Eğer ürünün resmi varsa arka plan olarak ata, yoksa yer tutucu ikon göster
    const image = project.images[0]
      ? `style="background-image: url('${project.images[0]}'); background-size: cover; background-position: center; width: 80px; height: 80px;"`
      : '';

    const isActive = project.isActive
      ? `<span class="badge bg-success bg-opacity-10 text-success border border-success">Active</span>`
      : `<span class="badge bg-danger bg-opacity-10 text-danger border border-danger">Passive</span>`;

    let finalHtml = templateData
      .replaceAll('{{id}}', project.id)
      .replaceAll('{{image}}', image)
      .replaceAll('{{title}}', project.title)
      .replaceAll('{{isActive}}', isActive);

    return finalHtml;
  }).join(''); // Dizi elemanlarını metne çevirip birleştir

  // Oluşturulan HTML'i sayfaya enjekte et
  projectsTable.innerHTML = projectsHTML;
}
