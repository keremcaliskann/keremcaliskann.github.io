import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

// 1. Sayfalarımızın özel verilerini (Context) bir obje olarak tanımlıyoruz
const pageData = {
  '/index.html': {
    title: 'KC',
  },
  '/about.html': {
    title: 'Hakkımda',
  },
  '/projects.html': {
    title: 'Projeler',
  },
  '/products.html': {
    title: 'Ürünler',
  },
};

export default defineConfig({
  base: '/',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'public', 'partials'),

      // 2. Vite sayfayı derlerken bu fonksiyon çalışır
      context(pagePath) {
        // Eğer o sayfa için veri tanımladıysak onu gönder, yoksa varsayılan bir veri gönder
        return pageData[pagePath] || { title: 'Kerem Portfolyo' };
      },
    }),
  ],
});