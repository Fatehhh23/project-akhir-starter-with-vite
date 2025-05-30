export default class AboutPage {
  constructor() {
    this._pageTitle = "Tentang Kami";
  }

  async render() {
    return `
      <section class="about-section" aria-labelledby="about-heading">
        <!-- Hero Section -->
        <div class="about-hero">
          <h1 id="about-heading" class="about-title">${this._pageTitle}</h1>
          <p class="about-tagline">Mengenal Lebih Dekat Platform Kami</p>
        </div>

        <!-- Main Content -->
        <div class="about-content">
          <!-- About App Card -->
          <article class="about-card">
            <h2 class="about-subtitle">📱 Tentang Aplikasi</h2>
            <div class="about-description">
              <p>StoryShare adalah platform berbagi cerita inspiratif yang memungkinkan pengguna untuk:</p>
              <ul class="feature-list">
                <li>📸 Berbagi momen melalui foto dan tulisan</li>
                <li>📍 Menandai lokasi di peta interaktif</li>
                <li>👥 Berinteraksi dengan komunitas pengguna lainnya</li>
              </ul>
              <p>Kami berkomitmen untuk menciptakan ruang berbagi yang aman dan inspiratif bagi semua pengguna.</p>
            </div>
          </article>

          <!-- Features Card -->
          <article class="about-card">
            <h2 class="about-subtitle">✨ Fitur Unggulan</h2>
            <div class="features-grid">
              <div class="feature-item">
                <i class="fas fa-camera-retro feature-icon"></i>
                <h3>Upload Cerita</h3>
                <p>Bagikan momen berharga dengan foto dan deskripsi</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-map-marked-alt feature-icon"></i>
                <h3>Peta Interaktif</h3>
                <p>Tandai lokasi cerita secara visual</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-users feature-icon"></i>
                <h3>Komunitas</h3>
                <p>Temukan dan ikuti cerita dari pengguna lain</p>
              </div>
            </div>
          </article>



          <!-- Contact Card -->
          <article class="about-card contact-card">
            <h2 class="about-subtitle">📬 Hubungi Kami</h2>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <p>Email: <a href="mailto:hello@storyshare.com">muhamadfatirizki@gmail.com.com</a></p>
              </div>
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>Lokasi: Jakarta, Indonesia</p>
              </div>
              <div class="social-media">
                <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
              </div>
            </div>
          </article>
        </div>

        <style>
          /* Styling */
          .about-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }

          .about-hero {
            text-align: center;
            margin-bottom: 3rem;
            padding: 4rem 1rem;
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            border-radius: 1rem;
            color: white;
          }

          .about-title {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }

          .about-tagline {
            font-size: 1.2rem;
            opacity: 0.9;
          }

          .about-content {
            display: grid;
            gap: 2rem;
            margin-top: 2rem;
          }

          .about-card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .about-card:hover {
            transform: translateY(-5px);
          }

          .about-subtitle {
            font-size: 1.5rem;
            color: #1f2937;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.5rem;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          }

          .feature-item {
            text-align: center;
            padding: 1.5rem;
            background: #f8fafc;
            border-radius: 0.5rem;
          }

          .feature-icon {
            font-size: 2rem;
            color: #6366f1;
            margin-bottom: 1rem;
          }

          .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 1rem;
          }

          .team-member {
            text-align: center;
            padding: 1.5rem;
          }

          .team-avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
            border: 3px solid #e5e7eb;
          }

          .contact-info {
            display: grid;
            gap: 1rem;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background: #f8fafc;
          }

          .contact-item i {
            font-size: 1.2rem;
            color: #6366f1;
          }

          .social-media {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
            justify-content: center;
          }

          .social-link {
            font-size: 1.5rem;
            color: #6b7280;
            transition: color 0.3s ease;
          }

          .social-link:hover {
            color: #6366f1;
          }

          @media (max-width: 768px) {
            .about-hero {
              padding: 2rem 1rem;
            }
            
            .about-title {
              font-size: 2rem;
            }
            
            .features-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </section>
    `;
  }

  async afterRender() {
    // Tambahkan inisialisasi komponen jika diperlukan
  }
}