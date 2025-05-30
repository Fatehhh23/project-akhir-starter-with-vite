export default class RegisterView {
  constructor(presenter) {
    this.presenter = presenter;
  }

  async render() {
    return `
      <section class="auth-section" aria-labelledby="registerHeading">
        <div class="auth-hero">
          <h1 id="registerHeading" class="auth-title">Bergabung Bersama Kami</h1>
          <p class="auth-subtitle">Mulai petualangan baru dengan membuat akun</p>
        </div>

        <div class="auth-container">
          <form id="registerForm" class="auth-form">
            <div class="form-group">
              <label for="name" class="input-label">
                <i class="fas fa-user icon"></i>
                Nama Lengkap
              </label>
              <div class="input-wrapper">
                <input 
                  type="text" 
                  id="name" 
                  required
                  autocomplete="name"
                  placeholder="Masukkan nama lengkap"
                  class="input-field"
                >
                <i class="fas fa-check-circle check-icon"></i>
              </div>
            </div>

            <div class="form-group">
              <label for="email" class="input-label">
                <i class="fas fa-envelope icon"></i>
                Alamat Email
              </label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  id="email" 
                  required
                  autocomplete="email"
                  placeholder="contoh@email.com"
                  class="input-field"
                >
                <i class="fas fa-check-circle check-icon"></i>
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="input-label">
                <i class="fas fa-lock icon"></i>
                Kata Sandi
              </label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="password" 
                  required
                  autocomplete="new-password"
                  minlength="8"
                  placeholder="••••••••"
                  class="input-field"
                >
                <button type="button" class="password-toggle">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>

            <button type="submit" class="btn-auth">
              <span class="btn-text">Daftar Sekarang</span>
              <div class="loader"></div>
            </button>

            <p class="auth-footer">
              Sudah punya akun? 
              <a href="#/login" class="auth-link">Masuk disini</a>
            </p>
          </form>
        </div>

        <style>
          /* Styling Konsisten dengan Login Page */
          .auth-section {
            max-width: 1200px;
            margin: 0 auto;
            min-height: 100vh;
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .auth-hero {
            text-align: center;
            padding: 2rem 1rem;
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            border-radius: 1rem;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .auth-title {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
          }

          .auth-subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
          }

          .auth-container {
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
          }

          .auth-form {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .input-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.5rem;
          }

          .input-wrapper {
            position: relative;
          }

          .input-field {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .input-field:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }

          .check-icon {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #10b981;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .input-field:valid + .check-icon {
            opacity: 1;
          }

          .password-toggle {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
          }

          .btn-auth {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: transform 0.2s ease;
          }

          .btn-auth:hover {
            transform: translateY(-2px);
          }

          .btn-text {
            position: relative;
            z-index: 1;
          }

          .loader {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s linear infinite;
          }

          .auth-form.loading .btn-text {
            visibility: hidden;
          }

          .auth-form.loading .loader {
            display: block;
          }

          .auth-footer {
            text-align: center;
            margin-top: 1.5rem;
            color: #6b7280;
          }

          .auth-link {
            color: #6366f1;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .auth-link:hover {
            color: #a855f7;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .auth-title {
              font-size: 2rem;
            }
            
            .auth-hero {
              padding: 1.5rem;
            }
          }
        </style>
      </section>
    `;
  }

  async afterRender() {
    this._cache();
    this._bindTogglePassword();
    this._bindSubmit();
  }

  _cache() {
    this.form          = document.getElementById('registerForm');
    this.nameInput     = document.getElementById('name');
    this.emailInput    = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.toggleBtn     = document.querySelector('.password-toggle');
  }

  _bindTogglePassword() {
    this.toggleBtn.addEventListener('click', () => {
      const t = this.passwordInput.type === 'password' ? 'text' : 'password';
      this.passwordInput.type = t;
      this.toggleBtn.innerHTML = t === 'password'
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
    });
  }

  _bindSubmit() {
    this.form.addEventListener('submit', async e => {
      e.preventDefault();
      await this.presenter.onRegister({
        name:     this.nameInput.value.trim(),
        email:    this.emailInput.value.trim(),
        password: this.passwordInput.value.trim(),
      });
    });
  }

  setLoading(active) {
    this.form.classList.toggle('loading', active);
  }

  showFieldError(inputEl, msg) {
    let err = inputEl.parentElement.querySelector('.error-message');
    if (!err) {
      err = document.createElement('small');
      err.className = 'error-message';
      inputEl.parentElement.append(err);
    }
    err.textContent = msg;
    inputEl.style.borderColor = '#ef4444';
    setTimeout(() => {
      err.remove();
      inputEl.style.borderColor = '';
    }, 3000);
  }

  showAlert(msg) {
    window.alert(msg);
  }

  redirectToHome() {
    window.location.hash = '#/';
  }
}
