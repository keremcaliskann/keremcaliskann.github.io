import { database } from "/src/firebase-config.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import productItem from '/src/productItem.html?raw';

const productsTable = document.getElementById('products-table');
let allProducts = [];
// 1. Firebase'den Verileri Çek
export async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(collection(database, "projects")); // Firestore'daki koleksiyon adın

    // Gelen veriyi bizim kullanabileceğimiz bir diziye (array) çevir
    allProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => b.order - a.order);

    // Ürünleri ekrana bas
    renderProducts(allProducts);

  } catch (error) {
    console.error("Firebase'den ürünler çekilemedi:", error);
  }
}

// 2. Ürünleri HTML'e Çevirip Ekrana Bas
async function renderProducts(productsToRender) {
  // Önce grid'in içini temizle
  productsTable.innerHTML = '';

  // Eğer ürün yoksa uyarı göster
  if (productsToRender.length === 0) {
    productsTable.innerHTML = `<div class="col-12 text-center text-secondary py-5">Aradığınız kriterde ürün bulunamadı.</div>`;
    return;
  }

  const templateData = productItem;

  // Her bir ürün için HTML kartı oluştur
  const productsHTML = productsToRender.map(product => {
    // Eğer ürünün resmi varsa arka plan olarak ata, yoksa yer tutucu ikon göster
    const image = product.images[0]
      ? `style="background-image: url('${product.images[0]}'); background-size: cover; background-position: center; width: 80px; height: 80px;"`
      : '';

    const isActive = product.isActive
      ? `<span class="badge bg-success bg-opacity-10 text-success border border-success">Active</span>`
      : `<span class="badge bg-danger bg-opacity-10 text-danger border border-danger">Passive</span>`;

    let finalHtml = templateData
      .replaceAll('{{id}}', product.id)
      .replaceAll('{{image}}', image)
      .replaceAll('{{title}}', product.title)
      .replaceAll('{{isActive}}', isActive);

    return finalHtml;
  }).join(''); // Dizi elemanlarını metne çevirip birleştir

  // Oluşturulan HTML'i sayfaya enjekte et
  productsTable.innerHTML = productsHTML;
}