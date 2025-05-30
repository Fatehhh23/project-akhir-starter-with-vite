export default class LoginView {
  constructor(presenter) {
    this.presenter = presenter;
  }

  async render() {
    return `
      <section class="login-section" aria-labelledby="loginHeading">
        <div class="login-hero">
          <h1 id="loginHeading" class="login-title">Selamat Datang Kembali</h1>
          <p class="login-subtitle">Masuk untuk melanjutkan petualanganmu</p>
        </div>

        <div class="login-container">
          <form id="loginForm" class="login-form">
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
                  autocomplete="current-password"
                  minlength="8"
                  placeholder="••••••••"
                  class="input-field"
                >
                <button type="button" class="password-toggle">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>

            <button type="submit" class="btn-login">
              <span class="btn-text">Masuk</span>
              <div class="loader"></div>
            </button>

            <p class="login-footer">
              Belum punya akun? 
              <a href="#/register" class="register-link">Daftar disini</a>
            </p>
          </form>
        </div>

        <style>
          /* Styling */
          .login-section {
            max-width: 1200px;
            margin: 0 auto;
            min-height: 100vh;
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .login-hero {
            text-align: center;
            padding: 2rem 1rem;
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            border-radius: 1rem;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .login-title {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
          }

          .login-subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
          }

          .login-container {
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
          }

          .login-form {
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

          .btn-login {
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

          .btn-login:hover {
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

          .login-form.loading .btn-text {
            visibility: hidden;
          }

          .login-form.loading .loader {
            display: block;
          }

          .login-footer {
            text-align: center;
            margin-top: 1.5rem;
            color: #6b7280;
          }

          .register-link {
            color: #6366f1;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .register-link:hover {
            color: #a855f7;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .login-title {
              font-size: 2rem;
            }
            
            .login-hero {
              padding: 1.5rem;
            }
          }
        </style>
      </section>
    `;
  }

  async afterRender() {
    this._cacheElements();
    this._bindTogglePassword();
    this._bindSubmit();
  }

  _cacheElements() {
    this.form          = document.getElementById('loginForm');
    this.emailInput    = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.toggleBtn     = document.querySelector('.password-toggle');
  }

  _bindTogglePassword() {
    this.toggleBtn.addEventListener('click', () => {
      const type = this.passwordInput.type === 'password' ? 'text' : 'password';
      this.passwordInput.type = type;
      this.toggleBtn.innerHTML = type === 'password'
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
    });
  }

  _bindSubmit() {
    this.form.addEventListener('submit', async e => {
      e.preventDefault();
      const email = this.emailInput.value.trim();
      const pwd   = this.passwordInput.value.trim();
      await this.presenter.onLoginSubmitted({ email, password: pwd });
    });
  }

  setLoading(isLoading) {
    this.form.classList.toggle('loading', isLoading);
  }

  showFieldError(inputEl, message) {
    let err = inputEl.parentElement.querySelector('.error-message');
    if (!err) {
      err = document.createElement('small');
      err.className = 'error-message';
      inputEl.parentElement.append(err);
    }
    err.textContent = message;
    inputEl.style.borderColor = '#ef4444';
    setTimeout(() => {
      err.remove();
      inputEl.style.borderColor = '';
    }, 3000);
  }

  showAlert(message) {
    window.alert(message);
  }

  redirectToHome() {
    window.location.hash = '#/';
  }
}
