// Import kelas utama dan inisialisasi notifikasi
import App from './app.js';
import { initPushNotification } from './utils/push.js';

// Tunggu sampai DOM siap
document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    navigationDrawer: document.getElementById('navigation-drawer'), // pastikan ID ini ada di index.html
    drawerButton:     document.getElementById('drawer-button'),
    content:          document.getElementById('main-content'),
  });

  // Render halaman pertama
  app.renderPage();

  // Render ulang saat URL hash berubah
  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  // Registrasi Service Worker & Push Notification
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registered:', registration);

        // Inisialisasi Push Notification
        initPushNotification(registration);
      } catch (err) {
        console.error('❌ Gagal mendaftarkan Service Worker:', err);
      }
    });
  } else {
    console.warn('🚫 Push Notification tidak didukung oleh browser ini.');
  }
});
