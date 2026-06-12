(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://script.google.com/macros/s/AKfycbw4_YAPusT5w7dvdMUqifs1iTLOt2tsbLlZZRmeEduCYVBr6RNs06W5FKVpKgeorg6YXw/exec`,t=`https://script.google.com/macros/s/AKfycby71CoQ0IjRO9jCnSRUr_MQRJTpA5Pz85HwrdXfWoWZ90OCbib4-vM0S52X1FtR0NpwLg/exec`;JSON.parse(localStorage.getItem(`cart`));function n(){let e=document.getElementById(`loader`);e&&(e.classList.add(`d-none`),e.style.setProperty(`display`,`none`,`important`))}document.addEventListener(`DOMContentLoaded`,async()=>{let e=new URLSearchParams(window.location.search);if(e.get(`clearCache`)===`true`)try{await Promise.all([fetch(`https://script.google.com/macros/s/AKfycbw4_YAPusT5w7dvdMUqifs1iTLOt2tsbLlZZRmeEduCYVBr6RNs06W5FKVpKgeorg6YXw/exec?clearCache=true`),fetch(`https://script.google.com/macros/s/AKfycby71CoQ0IjRO9jCnSRUr_MQRJTpA5Pz85HwrdXfWoWZ90OCbib4-vM0S52X1FtR0NpwLg/exec?clearCache=true`)]),localStorage.clear(),window.location.href=window.location.origin+window.location.pathname;return}catch(e){console.error(`Cache temizleme hatası:`,e)}let t=window.location.pathname;try{if(t.includes(`products`))await i(`products`,a);else if(t.includes(`projects`))await i(`projects`,o);else if(t.includes(`product-detail`)){let t=e.get(`id`);t&&await i(`products`,e=>{let n=e.find(e=>String(e.id)===String(t));if(n&&typeof s==`function`)s(n);else{let e=document.getElementById(`product-detail-container`);e&&(e.innerHTML=`Ürün bulunamadı.`)}})}}catch(e){console.error(`Sayfa yüklenirken kritik hata oluştu:`,e)}finally{n()}});async function r(n){let r=`data_${n}`,i=n===`products`?e:t;try{let e=await(await fetch(i)).json();return Array.isArray(e)?(e.forEach(e=>{let t=e.image||e.Image||``;typeof t==`string`&&t.trim()!==``?e.images=t.split(`,`).map(e=>e.trim()).filter(e=>e!==``):e.images=[`/logo-black.png`],e.image=e.images[0]||`/logo-black.png`}),localStorage.setItem(r,JSON.stringify(e)),e):[]}catch(e){return console.error(`API çekme hatası:`,e),JSON.parse(localStorage.getItem(r))||[]}}async function i(e,t){let i=`data_${e}`,a=localStorage.getItem(i);if(a)try{t(JSON.parse(a)),n()}catch(e){console.warn(`Eski cache verisi yeni kodla uyuşmadı, arka plan güncellemesi bekleniyor...`,e)}try{let n=await r(e);JSON.stringify(n)!==a&&t(n)}catch(e){console.error(`Veri işleme veya render hatası:`,e)}finally{n()}}function a(e){let t=document.getElementById(`product-list`);if(!t)return;let n=``;e.forEach(e=>{let t=e.images&&e.images.length>0?e.images:[e.image||`/logo-black.png`];n+=`
    <div class="col-md-4 col-sm-6 mb-4">
      <a href="product-detail.html?id=${e.id}" class="text-decoration-none">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
          <img src="${t[0]}" class="card-img-top rounded-top-4" 
               style="object-fit: cover; height: 200px; cursor: pointer;" 
               alt="${e.title||`Ürün`}"
               onerror="this.onerror=null; this.src='/logo-black.png';">
                 
          <div class="card-body d-flex flex-column p-4 text-dark">
            <h5 class="card-title fw-bold mb-2">${e.title||`İsimsiz Ürün`}</h5>
            <p class="card-text text-secondary small flex-grow-1">${e.description||e.detail||``}</p>
            
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="fs-5 fw-bold text-dark">${e.price||0} ₺</span>
            </div>
          </div>
        </div>
      </a>
    </div>
    `}),t.innerHTML=n}function o(e){let t=document.getElementById(`project-list`);if(!t)return;let n=``;e.forEach(e=>{let t=e.images&&e.images.length>0?e.images:[e.image||`/logo-black.png`];n+=`
    <div class="col-md-4 col-sm-6 mb-4">
      <a href="${e.detail||`#`}" target="_blank" class="text-decoration-none h-100 d-block">
        <div class="card h-100 border-0 bg-white rounded-4 shadow-sm overflow-hidden hover-lift">
          <img src="${t[0]}" class="card-img-top bg-light" alt="${e.title||`Proje`}" 
               style="height: 200px; object-fit: contain; padding: 10px;"
               onerror="this.onerror=null; this.src='/logo-black.png';">
          
          <div class="card-body p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="card-title fw-bold mb-0 text-dark">${e.title||`İsimsiz Proje`}</h5>
            </div>
            <p class="card-text text-muted small">${e.description||``}</p>
          </div>
        </div>
      </a>
    </div>
    `}),t.innerHTML=n}function s(e){let t=document.getElementById(`product-detail-container`);if(!t)return;let n=e.images&&e.images.length>0?e.images:[e.image||`/logo-black.png`];t.innerHTML=`
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col-12 mb-3">
              <div class="main-image-zoom-container border border-2 rounded-4 overflow-hidden position-relative bg-light" 
                   style="height: 350px; display: flex; align-items: center; justify-content: center; cursor: zoom-in;"
                   onmousemove="handleZoom(event)" 
                   onmouseleave="resetZoom()">
                <img id="main-image" src="${n[0]}" 
                     class="img-fluid" 
                     style="max-height: 100%; width: 100%; object-fit: contain; transition: transform 0.1s ease-out;" 
                     alt="${e.title}"
                     onerror="this.onerror=null; this.src='/logo-black.png';">
              </div>
            </div>
            
            <div class="col-12">
              <div class="thumbnail-gallery d-flex flex-wrap gap-2">
                ${n.map((e,t)=>`
                  <div class="thumbnail-container border border-1 rounded overflow-hidden cursor-pointer ${t===0?`active-thumbnail`:``}" 
                       style="width: 60px; height: 60px;" onclick="changeMainImage('${e}', ${t})">
                    <img src="${e}" class="img-fluid" style="object-fit: contain; width: 100%; height: 100%;" 
                         onerror="this.src='/logo-black.png';">
                  </div>
                `).join(``)}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h1 class="fw-bold">${e.title||`Ürün Detayı`}</h1>
          <p class="text-secondary my-4">${e.detail||e.description||``}</p>
          <p class="fs-3 fw-bold mb-4">${e.price||0} ₺</p>

          <a href="https://wa.me/905422475952?text=Merhaba, ${encodeURIComponent(e.title||`Ürün`)} hakkında bilgi almak istiyorum." 
             target="_blank" 
             class="btn btn-success btn-lg rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2 fw-semibold">
             <i class="bi bi-whatsapp"></i> Mesaj Gönder
          </a>
        </div>
      </div>
    </div>
    
    <style>
      .active-thumbnail { border-color: #000 !important; border-width: 2px !important; }
      .main-image-zoom-container { overflow: hidden; }
    </style>
  `}window.changeMainImage=function(e,t){let n=document.getElementById(`main-image`);n&&(n.src=e);let r=document.getElementById(`product-detail-container`);if(r){let e=r.querySelectorAll(`.thumbnail-container`);e.forEach(e=>e.classList.remove(`active-thumbnail`)),e[t]&&e[t].classList.add(`active-thumbnail`)}},window.handleZoom=function(e){let t=e.currentTarget,n=document.getElementById(`main-image`);if(!n)return;let r=e.offsetX/t.offsetWidth*100,i=e.offsetY/t.offsetHeight*100;n.style.transformOrigin=`${r}% ${i}%`,n.style.transform=`scale(2)`},window.resetZoom=function(){let e=document.getElementById(`main-image`);e&&(e.style.transform=`scale(1)`,e.style.transformOrigin=`center center`)};