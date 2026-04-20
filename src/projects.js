import { database } from "/src/firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import cardTemplate from './project.html?raw';

// HTML Elementlerini Seçelim
const spinner = document.getElementById('loading-spinner');
const grid = document.getElementById('projects-grid');
const searchInput = document.getElementById('searchInput');

// Ürünleri hafızada tutacağımız dizi (Filtreleme için gerekli)
let allProjects = [];

// 1. Firebase'den Verileri Çek
async function fetchProjects() {
    try {
        const querySnapshot = await getDocs(collection(database, "projects")); // Firestore'daki koleksiyon adın

        // Gelen veriyi bizim kullanabileceğimiz bir diziye (array) çevir
        allProjects = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Ürünleri ekrana bas
        renderProjects(allProjects);

        // Yükleniyor animasyonunu gizle, Ürünleri göster
        spinner.classList.add('d-none');
        grid.classList.remove('d-none');

    } catch (error) {
        console.error("Firebase'den ürünler çekilemedi:", error);
        spinner.innerHTML = `<p class="text-danger">Ürünler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.</p>`;
    }
}

// 2. Ürünleri HTML'e Çevirip Ekrana Bas
async function renderProjects(projectsToRender) {
    // Önce grid'in içini temizle
    grid.innerHTML = '';

    // Eğer ürün yoksa uyarı göster
    if (projectsToRender.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center text-secondary py-5">Aradığınız kriterde ürün bulunamadı.</div>`;
        return;
    }

    const templateData = cardTemplate;

    // Her bir ürün için HTML kartı oluştur
    const projectsHTML = projectsToRender.map(project => {
        // Eğer ürünün resmi varsa arka plan olarak ata, yoksa yer tutucu ikon göster
        const image = project.images[0]
            ? `style="background-image: url('${project.images[0]}'); background-size: cover; background-position: center;"`
            : '';

        let finalHtml = templateData
            .replace('{{image}}', image)
            .replace('{{title}}', project.title)
            .replace('{{description}}', project.description)
            .replace('{{link}}', project.link);

        return finalHtml;
    }).join(''); // Dizi elemanlarını metne çevirip birleştir

    // Oluşturulan HTML'i sayfaya enjekte et
    grid.innerHTML = projectsHTML;
}

// Sayfa yüklendiğinde verileri çekmeye başla
fetchProjects();