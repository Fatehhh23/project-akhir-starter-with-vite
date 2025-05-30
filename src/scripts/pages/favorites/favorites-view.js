// src/scripts/pages/favorites/favorites-view.js

export default class FavoritesView {
  constructor() {
    this.presenter = null;
  }

  async render() {
    const favs = await this.presenter.getFavorites();
    // CSS inline agar konsisten dengan HomePage
    const css = `
      <style>
        .home-container { max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; }
        .header-section { text-align: center; margin-bottom: 3rem; }
        .main-title { color: #2d3748; font-size: 2.5rem; margin-bottom: 0.5rem; }
        .sub-title { color: #718096; font-size: 1.1rem; }
        .stories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 4rem; }
        .story-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
        .story-card:hover { transform: translateY(-5px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
        .image-wrapper { height: 250px; overflow: hidden; position: relative; border-bottom: 3px solid #e2e8f0; }
        .story-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
        .story-card:hover .story-image { transform: scale(1.05); }
        .card-content { padding: 1.5rem; }
        .story-title { color: #2d3748; margin: 0 0 1rem; font-size: 1.3rem; }
        .story-desc { color: #4a5568; line-height: 1.6; margin-bottom: 1.5rem; min-height: 60px;
                       display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .story-meta { display: flex; justify-content: flex-end; gap: 0.5rem; font-size: 0.9rem; color: #718096; }
        .del-btn { background: var(--primary-color); color: #fff; border: none; padding: 0.25em 0.75em; border-radius: 0.25rem;
                   font-size: 0.9rem; cursor: pointer; transition: background 0.2s; }
        .del-btn:hover { background: var(--secondary-color); }
      </style>
    `;

    if (!favs.length) {
      return `
        <section class="home-container">
          ${css}
          <div class="header-section">
            <h1 class="main-title">⭐ Daftar Favorit</h1>
            <p class="sub-title">Belum ada cerita favoritmu.</p>
          </div>
        </section>
      `;
    }

    return `
      <section class="home-container">
        ${css}
        <div class="header-section">
          <h1 class="main-title">⭐ Daftar Favorit</h1>
          <p class="sub-title">Cerita pilihanmu di sini.</p>
        </div>

        <div class="stories-grid">
          ${favs.map(f => `
            <article class="story-card" id="fav-${f.id}">
              <div class="image-wrapper">
                <img
                  src="${f.photoUrl}"
                  alt="${f.description || f.name || 'Story image'}"
                  onerror="this.src='/images/placeholder.jpg'"
                  class="story-image"
                />
              </div>
              <div class="card-content">
                <h3 class="story-title">${f.name || 'Anonymous'}</h3>
                <p class="story-desc">${f.description || '-'}</p>
                <div class="story-meta">
                  <button
                    class="del-btn"
                    data-id="${f.id}"
                    aria-label="Hapus dari favorit"
                  >🗑️ Hapus</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  afterRender() {
    document.querySelectorAll('.del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.presenter.handleDelete(btn.dataset.id);
      });
    });
  }
}
