// src/scripts/pages/home/home-presenter.js

import { StoryAPI } from '../../data/api';
import { AuthService } from '../../utils/auth';
import L from 'leaflet';
import { saveItem, deleteItem, getAllItems } from '../../../db.js';

export default class HomePresenter {
  constructor(view) {
    this.view      = view;
    this.map       = null;
    this.markers   = [];
    this.stories   = [];
    this.view.presenter = this;
  }

  async loadAndDisplayStories() {
    try {
      const res = await StoryAPI.getStories();
      if (!res.listStory) throw new Error('Format data tidak valid');

      const stories = res.listStory.filter(s =>
        s.photoUrl &&
        !Number.isNaN(parseFloat(s.lat)) &&
        !Number.isNaN(parseFloat(s.lon))
      );

      this.stories = stories;
      const favIds = await this.getFavoriteIds();

      const html = stories
        .map(s => this._storyCardHtml(s, favIds.has(s.id)))
        .join('');
      this.view.displayStories(html);

      this._addMarkers(stories);
    } catch (err) {
      console.error(err);
      this.view.showError(err.message);
    }
  }

  async getFavoriteIds() {
    const favs = await getAllItems();
    return new Set(favs.map(f => f.id));
  }

  _storyCardHtml(story, isFav) {
    const fmtCoord = c => parseFloat(c).toFixed(4);
    const fmtDate = d =>
      new Date(d).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

    return `
      <article class="story-card" id="story-${story.id}">
        <div class="image-wrapper">
          <img
            src="${story.photoUrl}"
            onerror="this.src='/images/placeholder.jpg'"
            alt="${story.description || story.name || 'Story image'}"
            loading="lazy"
            class="story-image"
          >
        </div>
        <div class="card-content">
          <h3 class="story-title">${story.name || 'Anonymous'}</h3>
          <p class="story-desc">${story.description || 'Tidak ada deskripsi'}</p>
          <div class="story-meta">
            <span class="location">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
              ${fmtCoord(story.lat)}, ${fmtCoord(story.lon)}
            </span>
            <time>${fmtDate(story.createdAt)}</time>
          </div>
           <button   class="fav-btn"
   data-id="${story.id}"
   aria-pressed="${isFav}"
   aria-label="${isFav ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}"
 >
   ${isFav
     ? '<i class="fas fa-star" aria-hidden="true"></i>'
     : '<i class="far fa-star" aria-hidden="true"></i>'}
 </button>
        </div>
      </article>
    `;
  }

  async handleFavoriteToggle(id) {
    const favIds = await this.getFavoriteIds();
    const isFav  = favIds.has(id);

    if (isFav) {
      await deleteItem(id);
    } else {
      const story = this.stories.find(s => s.id === id);
      if (story) await saveItem(story);
    }

    await this._refreshHome();
  }

  async _refreshHome() {
    const html = await this.view.render();
    this.view.displayStories(html);
    this.view.afterRender();
  }

  initMap(container) {
    if (!container) return;
    this.map = L.map(container).setView([-6.2, 106.8], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  _addMarkers(stories) {
    if (!this.map) return;
    this.markers.forEach(m => m.remove());
    this.markers = [];

    stories.forEach(s => {
      const lat = parseFloat(s.lat);
      const lon = parseFloat(s.lon);
      if (Number.isNaN(lat) || Number.isNaN(lon)) return;
      const marker = L.marker([lat, lon])
        .bindPopup(`
          <h4>${s.name || 'Anonymous'}</h4>
          <img src="${s.photoUrl}" alt="" style="max-width:150px">
          <p>${s.description || ''}</p>
        `)
        .addTo(this.map);
      this.markers.push(marker);
    });

    if (this.markers.length > 0) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }

  toggleFab() {
    const visible = AuthService.isAuthenticated();
    this.view.showFab(visible);
  }
}
