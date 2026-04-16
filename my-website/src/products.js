import { database } from "/src/firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import cardTemplate from './product.html?raw';

// HTML Elementlerini Seçelim
const spinner = document.getElementById('loading-spinner');
const grid = document.getElementById('products-grid');
const searchInput = document.getElementById('searchInput');

// Ürünleri hafızada tutacağımız dizi (Filtreleme için gerekli)
let allProducts = [];

// 1. Firebase'den Verileri Çek
async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(database, "products")); // Firestore'daki koleksiyon adın

        // Gelen veriyi bizim kullanabileceğimiz bir diziye (array) çevir
        allProducts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Ürünleri ekrana bas
        renderProducts(allProducts);

        // Yükleniyor animasyonunu gizle, Ürünleri göster
        spinner.classList.add('d-none');
        grid.classList.remove('d-none');

    } catch (error) {
        console.error("Firebase'den ürünler çekilemedi:", error);
        spinner.innerHTML = `<p class="text-danger">Ürünler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.</p>`;
    }
}

// 2. Ürünleri HTML'e Çevirip Ekrana Bas
async function renderProducts(productsToRender) {
    // Önce grid'in içini temizle
    grid.innerHTML = '';

    // Eğer ürün yoksa uyarı göster
    if (productsToRender.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center text-secondary py-5">Aradığınız kriterde ürün bulunamadı.</div>`;
        return;
    }

    const templateData = cardTemplate;

    // Her bir ürün için HTML kartı oluştur
    const productsHTML = productsToRender.map(product => {
        // Eğer ürünün resmi varsa arka plan olarak ata, yoksa yer tutucu ikon göster
        const image = product.images[0]
            ? `style="background-image: url('${product.images[0]}'); background-size: cover; background-position: center;"`
            : '';

        let finalHtml = templateData
            .replace('{{image}}', image)
            .replace('{{title}}', product.title)
            .replace('{{description}}', product.description)
            .replace('{{price}}', product.price);

        return finalHtml;
    }).join(''); // Dizi elemanlarını metne çevirip birleştir

    // Oluşturulan HTML'i sayfaya enjekte et
    grid.innerHTML = productsHTML;
}

// 3. Arama ve Filtreleme Dinleyicileri
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        return matchesSearch;
    });

    renderProducts(filtered);
}

// Kullanıcı yazı yazdıkça veya kategori değiştikçe filtreyi çalıştır
searchInput.addEventListener('input', filterProducts);

// Sayfa yüklendiğinde verileri çekmeye başla
fetchProducts();