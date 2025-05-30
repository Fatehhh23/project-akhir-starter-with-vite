// hanya urus rendering + binding event
export default class AddStoryView {
  constructor(presenter) {
    this.presenter = presenter;
  }

  async render() {
    return `
      <section class="auth-container" aria-labelledby="addStoryHeading">
        <h1 id="addStoryHeading" class="title">Tambah Story Baru</h1>
        <p class="subtitle">Bagikan momen spesialmu dengan komunitas</p>

        <form id="storyForm" class="story-form">
          <div class="form-group">
            <label for="photo">Foto Story</label>
            
            <div class="media-upload-container">
              <div class="camera-preview" id="cameraPreview" hidden>
                <video id="cameraView" class="media-preview" playsinline autoplay></video>
                <div class="camera-controls">
                  <button type="button" id="switchCamera" class="btn-icon round">
                    <i class="fas fa-sync-alt"></i>
                  </button>
                  <button type="button" id="captureBtn" class="btn-icon round primary">
                    <i class="fas fa-camera"></i>
                  </button>
                </div>
              </div>

              <div class="image-preview" id="imagePreview" hidden>
                <img id="previewImage" class="media-preview" alt="Preview gambar">
                <button type="button" id="retakeBtn" class="btn-secondary">
                  <i class="fas fa-redo"></i> Ambil Ulang
                </button>
              </div>

              <div class="media-actions">
                <button type="button" id="startCamera" class="btn-primary">
                  <i class="fas fa-camera"></i> Buka Kamera
                </button>
                <label class="btn-secondary">
                  <i class="fas fa-folder-open"></i> Pilih dari Galeri
                  <input 
                    type="file" 
                    id="photoInput" 
                    accept="image/*"
                    hidden
                  >
                </label>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="description">Deskripsi</label>
            <textarea 
              id="description" 
              class="form-input"
              rows="4"
              required
              minlength="10"
              placeholder="Ceritakan pengalaman Anda (min. 10 karakter)"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Pilih Lokasi</label>
            <div id="map" class="map-container"></div>
            <small class="map-note">Klik peta untuk memilih lokasi</small>
          </div>

          <button type="submit" class="submit-button">
            <i class="fas fa-cloud-upload-alt"></i> Upload Story
          </button>
        </form>
      </section>

      <style>
        .auth-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .title {
          color: #2d3748;
          text-align: center;
          margin-bottom: 0.5rem;
          font-size: 1.8rem;
        }

        .subtitle {
          color: #718096;
          text-align: center;
          margin-bottom: 2rem;
        }

        .media-upload-container {
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .media-preview {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .camera-controls {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .btn-icon {
          padding: 0.75rem;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-icon.primary {
          background: #4299e1;
          color: white;
        }

        .btn-icon:hover {
          transform: scale(1.05);
        }

        .media-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .map-container {
          height: 300px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin-top: 0.5rem;
        }

        .map-note {
          display: block;
          margin-top: 0.5rem;
          color: #718096;
          font-size: 0.875rem;
        }

        textarea.form-input {
          min-height: 100px;
          resize: vertical;
          padding: 1rem;
          line-height: 1.5;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background-color: #48bb78;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #38a169;
        }

        .btn-secondary {
          background: #f7fafc;
          border: 1px solid #cbd5e0;
          color: #2d3748;
        }
      </style>
    `;
  }

 
  async afterRender() {
    // pindahkan DOM mapSelector ke view
    const mapEl = document.getElementById('map');
    await this.presenter.initMap(
      mapEl,
      this.onMapClick.bind(this)
    );

    // binding kamera & form seperti sebelumnya
    this.presenter.setupCameraHandlers(
      this.showCameraPreview.bind(this),
      this.showImagePreview.bind(this)
    );
    this.bindForm();
  }

  onMapClick(latlng) {
    // view-only: tampilkan marker via presenter
    this.presenter.updateMarker(latlng);

  }

  showCameraPreview() {
    document.getElementById('cameraPreview').hidden = false;
    document.getElementById('startCamera').hidden = true;
  }

  showImagePreview(dataUrl) {
    const img = document.getElementById('previewImage');
    img.src = dataUrl;
    document.getElementById('imagePreview').hidden = false;
  }

  bindForm() {
    const form = document.getElementById('storyForm');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const desc = document.getElementById('description').value.trim();
      await this.presenter.submit({
        description: desc,
      });
    });
  }

  alert(msg) { window.alert(msg); }
  redirectToHome() { window.location.hash = '#/'; }
}
