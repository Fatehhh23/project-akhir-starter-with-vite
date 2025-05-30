// src/app.js

import { getActiveRoute } from './routes/url-parser.js';
import routes from './routes/routes.js';
import { AuthService } from './utils/auth.js';

export default class App {
  constructor({ navigationDrawer, drawerButton, content }) {
    this.navigationDrawer = navigationDrawer;
    this.drawerButton = drawerButton;
    this.content = content;
    this._setupDrawer();
    this._setupAuth();
  }

  _setupDrawer() {
    // buka/tutup drawer
    if (this.drawerButton && this.navigationDrawer) {
      this.drawerButton.addEventListener('click', () => {
        this.navigationDrawer.classList.toggle('active');
      });
    }
    // klik di luar -> tutup drawer
    document.body.addEventListener('click', (e) => {
      const tgt = e.target;
      if (
        this.navigationDrawer &&
        this.drawerButton &&
        // hanya tutup bila klik bukan di dalam drawer & bukan tombol
        !this.navigationDrawer.contains(tgt) &&
        !this.drawerButton.contains(tgt)
      ) {
        this.navigationDrawer.classList.remove('active');
      }
    });
  }

  _setupAuth() {
    const updateAuthState = () => {
      const loggedIn = AuthService.isAuthenticated();
      document.querySelectorAll('.auth-link').forEach(el => el.hidden = loggedIn);
      const logoutLink = document.getElementById('logoutLink');
      if (logoutLink) {
        logoutLink.hidden = !loggedIn;
        if (loggedIn) {
          logoutLink.onclick = (e) => {
            e.preventDefault();
            AuthService.logout();
          };
        }
      }
    };
    window.addEventListener('auth-change', updateAuthState);
    window.addEventListener('hashchange', updateAuthState);
    updateAuthState();
  }

  async renderPage() {
    try {
      const route = getActiveRoute();
      const page   = routes[route] || routes['/'];
      this.content.innerHTML = await page.render();
      await page.afterRender();
    } catch (err) {
      console.error(err);
      this.content.innerHTML = `
        <div class="error-container">
          <h2>Gagal Memuat Halaman</h2>
          <p>${err.message}</p>
          <a href="#/">Kembali ke Beranda</a>
        </div>`;
    }
  }
}
