import { StoryAPI } from '../../data/api';
import L from 'leaflet';

export default class AddStoryPresenter {
  constructor(view) {
    this.view = view;
    this.map = null;
    this.marker = null;
    this.coords = null;
    this.mediaStream = null;
    this.currentFacingMode = 'environment';
    this.selectedFile = null;
  }

  /**
   * Inisialisasi peta, terima elemen container dan callback klik
   * @param {HTMLElement} mapContainer 
   * @param {(latlng: L.LatLng) => void} onClickCallback 
   */
  async initMap(mapContainer, onClickCallback) {
    this.map = L.map(mapContainer).setView([-2.5489, 118.0149], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', e => {
      onClickCallback(e.latlng);
    });
  }

  /**
   * Update marker berdasarkan koordinat yang diberikan view
   * @param {L.LatLng} latlng 
   */
  updateMarker(latlng) {
    this.coords = latlng;
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([latlng.lat, latlng.lng])
      .addTo(this.map)
      .bindPopup('Lokasi dipilih')
      .openPopup();
  }

  setupCameraHandlers(showCam, showImg) {
    const video = document.getElementById('cameraView');
    document.getElementById('startCamera')
      .addEventListener('click', () => this.startCamera(showCam));
    document.getElementById('switchCamera')
      .addEventListener('click', () => this.toggleCamera(showCam));
    document.getElementById('captureBtn')
      .addEventListener('click', () => this.capturePhoto(video, showImg));
    document.getElementById('retakeBtn')
      .addEventListener('click', () => this.retakePhoto(showCam));
    document.getElementById('photoInput')
      .addEventListener('change', e => this.chooseFromGallery(e, showImg));
  }

  async startCamera(showCam) {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: this.currentFacingMode }
      });
      document.getElementById('cameraView').srcObject = this.mediaStream;
      showCam();
    } catch {
      this.view.alert('Tidak dapat mengakses kamera');
    }
  }

  toggleCamera(showCam) {
    this.currentFacingMode = this.currentFacingMode === 'environment' ? 'user' : 'environment';
    this.stopCamera();
    this.startCamera(showCam);
  }

  capturePhoto(videoEl, showImg) {
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      this.selectedFile = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      const reader = new FileReader();
      reader.onload = e => showImg(e.target.result);
      reader.readAsDataURL(this.selectedFile);
      this.stopCamera();
    }, 'image/jpeg');
  }

  retakePhoto(showCam) {
    this.selectedFile = null;
    document.getElementById('imagePreview').hidden = true;
    showCam();
  }

  chooseFromGallery(e, showImg) {
    const file = e.target.files[0];
    // validasi tipe & ukuran...
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = ev => showImg(ev.target.result);
    reader.readAsDataURL(file);
  }

  async submit({ description }) {
    // validasi minimal di presenter
    if (!this.selectedFile) return this.view.alert('Harap ambil/pilih foto');
    if (!this.coords)      return this.view.alert('Harap pilih lokasi');
    if (description.length < 10) return this.view.alert('Deskripsi minimal 10 karakter');

    const fd = new FormData();
    fd.append('photo', this.selectedFile);
    fd.append('description', description);
    fd.append('lat', this.coords.lat);
    fd.append('lon', this.coords.lng);

    try {
      const res = await StoryAPI.addStory(fd);
      if (res.error) throw new Error(res.message);
      this.view.alert('Story berhasil diupload!');
      this.view.redirectToHome();
    } catch (err) {
      this.view.alert(`GAGAL UPLOAD:\n${err.message}`);
    }
  }

  stopCamera() {
    if (!this.mediaStream) return;
    this.mediaStream.getTracks().forEach(t => t.stop());
    this.mediaStream = null;
    document.getElementById('cameraPreview').hidden = true;
  }
}
