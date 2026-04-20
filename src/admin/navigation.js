document.addEventListener("DOMContentLoaded", () => {
  // Tüm menü linklerini ve içerik alanlarını seç
  const menuLinks = document.querySelectorAll('.menu-link');
  const contentSections = document.querySelectorAll('.content-section');

  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Sayfanın yukarı zıplamasını engeller

      // 1. Tıklanan hedefin ID'sini al
      const targetId = this.getAttribute('data-target');

      // 2. Tüm menü elemanlarından aktif sınıflarını temizle, text-dark ekle
      menuLinks.forEach(item => {
        item.classList.remove('active', 'bg-primary', 'text-white', 'shadow-sm');
        item.classList.add('text-dark');
      });

      // 3. Tıklanan menü elemanına aktif sınıflarını ekle, text-dark'ı sil
      this.classList.remove('text-dark');
      this.classList.add('active', 'bg-primary', 'text-white', 'shadow-sm');

      // 4. Tüm içerik alanlarını gizle (d-none ekle)
      contentSections.forEach(section => {
        section.classList.add('d-none');
      });

      // 5. Sadece hedeflenen içeriği göster (d-none kaldır)
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove('d-none');
      }
    });
  });
});