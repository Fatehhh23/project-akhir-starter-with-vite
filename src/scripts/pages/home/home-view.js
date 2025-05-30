
export default class HomeView {
  constructor() {
    this.presenter = null; // diset oleh HomePresenter
  }


  async render() {
    return `
      <section class="home-container" aria-label="Daftar Story">
        <div class="header-section">
          <h1 class="main-title">📖 Story Perjalanan</h1>
          <p class="sub-title">Jelajahi petualangan komunitas traveler kami</p>
        </div>

        <!-- placeholder untuk daftar story -->
        <div id="storiesGrid" class="stories-grid"></div>

        <!-- placeholder untuk peta -->
        <div class="map-section">
          <h2 class="map-title">📍 Peta Lokasi Story</h2>
          <div id="map" class="story-map"></div>
        </div>

        <!-- tombol FAB, visibility dikontrol presenter -->
        <a href="#/add-story" id="fabBtn" class="fab-button" hidden>
          <i class="fas fa-plus"></i>
        </a>
              <style>
                .home-container {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 2rem 1rem;
                }
      
                .header-section {
                  text-align: center;
                  margin-bottom: 3rem;
                }
      
                .main-title {
                  color: #2d3748;
                  font-size: 2.5rem;
                  margin-bottom: 0.5rem;
                }
      
                .sub-title {
                  color: #718096;
                  font-size: 1.1rem;
                }
      
                .stories-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                  gap: 2rem;
                  margin-bottom: 4rem;
                }
      
                .story-card {
                  background: white;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                  transition: transform 0.3s ease;
                }
      
                .story-card:hover {
                  transform: translateY(-5px);
                  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                }
      
                .image-wrapper {
                  height: 250px;
                  overflow: hidden;
                  position: relative;
                  border-bottom: 3px solid #e2e8f0;
                }
      
                .story-image {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 0.3s ease;
                }
      
                .story-card:hover .story-image {
                  transform: scale(1.05);
                }
      
                .card-content {
                  padding: 1.5rem;
                }
      
                .story-title {
                  color: #2d3748;
                  margin: 0 0 1rem;
                  font-size: 1.3rem;
                }
      
                .story-desc {
                  color: #4a5568;
                  line-height: 1.6;
                  margin-bottom: 1.5rem;
                  min-height: 60px;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
      
                .story-meta {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-size: 0.9rem;
                  color: #718096;
                }
      
                .location {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  color: #e53e3e;
                }
      
                .map-section {
                  margin: 4rem 0;
                }
      
                .map-title {
                  text-align: center;
                  color: #2d3748;
                  margin-bottom: 1.5rem;
                  font-size: 1.5rem;
                }
      
                .story-map {
                  height: 500px;
                  border-radius: 12px;
                  border: 1px solid #e2e8f0;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }
      
                .fab-button {
                  position: fixed;
                  bottom: 2rem;
                  right: 2rem;
                  width: 56px;
                  height: 56px;
                  background: #48bb78;
                  color: white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 12px rgba(72,187,120,0.3);
                  transition: all 0.3s ease;
                  text-decoration: none;
                }
      
                .fab-button:hover {
                  background: #38a169;
                  transform: scale(1.1);
                  box-shadow: 0 6px 16px rgba(72,187,120,0.4);
                }
      
                @media (max-width: 768px) {
                  .main-title {
                    font-size: 2rem;
                  }
                  
                  .story-map {
                    height: 300px;
                  }
                  
                  .fab-button {
                    bottom: 1rem;
                    right: 1rem;
                  }
                }
              </style>
            </section>
          `;
  }

 async afterRender() {
    // elemen
    const grid  = document.getElementById('storiesGrid');
    const mapEl = document.getElementById('map');

    // init FAB visibility & map + load stories
    this.presenter.toggleFab();
    this.presenter.initMap(mapEl);
    await this.presenter.loadAndDisplayStories();

    // pasang listener pada tombol favorit yang baru dirender
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        this.presenter.handleFavoriteToggle(id);
      });
    });

    // update FAB & stories saat auth state berubah
    window.addEventListener('auth-change', async () => {
      this.presenter.toggleFab();
      await this.presenter.loadAndDisplayStories();
    });
  }

  /** Pasang HTML cerita ke grid */
  displayStories(html) {
    document.getElementById('storiesGrid').innerHTML = html;
  }

  /** Show/hide FAB */
  showFab(show) {
    document.getElementById('fabBtn').hidden = !show;
  }

  /** Tampilkan alert error */
  showError(message) {
    alert(`Error: ${message}`);
  }
}
