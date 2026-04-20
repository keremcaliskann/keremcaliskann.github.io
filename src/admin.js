import { fetchProducts } from "/src/admin/fetchProducts.js"
import { fetchProjects } from "/src/admin/fetchProjects.js"
import "/src/admin/navigation.js"
import "/src/admin/project-controller.js"
import "/src/admin/product-controller.js"

document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll('.menu-link');
    const contentSections = document.querySelectorAll('.content-section');

    // --- YENİ EKLENEN KISIM 1: Sayfa açıldığında hafızayı kontrol et ---
    const savedTab = localStorage.getItem("activeAdminTab");
    if (savedTab) {
        // Hafızada bir sekme varsa, o sekmeye ait butonu bulup tıklama olayını simüle ediyoruz
        const targetLink = document.querySelector(`.menu-link[data-target="${savedTab}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-target');

            // --- YENİ EKLENEN KISIM 2: Tıklanan sekmeyi hafızaya kaydet ---
            localStorage.setItem("activeAdminTab", targetId);

            // Eski kodların (aktif sınıfları değiştirme vb. aynı kalacak)
            menuLinks.forEach(item => {
                item.classList.remove('active', 'bg-primary', 'text-white', 'shadow-sm');
                item.classList.add('text-dark');
            });

            this.classList.remove('text-dark');
            this.classList.add('active', 'bg-primary', 'text-white', 'shadow-sm');

            contentSections.forEach(section => {
                section.classList.add('d-none');
            });

            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('d-none');
            }
        });
    });
});

fetchProducts();

fetchProjects();