// 1. Tüm parçalar için kullanabileceğimiz tek bir genel fonksiyon
async function loadPartial(url, targetId) {
    try {
        // 1. Dosya daha önce indirilip hafızaya (cache) alınmış mı kontrol et
        const cachedHtml = sessionStorage.getItem(url);
        let data = "";

        if (cachedHtml) {
            // Eğer hafızada varsa, internete bağlanmadan direkt onu kullan (Işık hızı)
            data = cachedHtml;
        } else {
            // Eğer hafızada yoksa (siteye ilk giriş), sunucudan fetch ile çek
            const response = await fetch(url);
            if (!response.ok) throw new Error("Ağ hatası");
            data = await response.text();

            // Çekilen veriyi sonraki sayfalar için hafızaya kaydet
            sessionStorage.setItem(url, data);
        }

        document.getElementById(targetId).innerHTML = data;
    } catch (error) {
        console.error(`${url} yüklenemedi:`, error);
    }
}

// 2. Uygulamayı başlatan ana fonksiyon
async function initApp() {
    // HEAD yüklendikten sonra diğerlerini aynı anda (paralel) yükle
    // Bu sayede hızdan ödün vermemiş oluruz
    await Promise.all([
        loadPartial('/Partials/navigation.html', 'navbar-container'),
        //loadPartial('/Partials/banner.html', 'banner-container'),
        loadPartial('/Partials/footer.html', 'footer-container')
    ]);

    document.body.style.opacity = "1";
}

// Sistemi çalıştır
initApp();