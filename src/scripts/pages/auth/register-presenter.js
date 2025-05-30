import { AuthAPI } from '../../data/api';

export default class RegisterPresenter {
  constructor(view) {
    this.view = view;
  }

  async onRegister({ name, email, password }) {
    // 1. Validasi
    let valid = true;
    if (!name) {
      this.view.showFieldError(this.view.nameInput, 'Nama lengkap wajib diisi');
      valid = false;
    }
    if (!this._validateEmail(email)) {
      this.view.showFieldError(this.view.emailInput, 'Format email tidak valid');
      valid = false;
    }
    if (password.length < 8) {
      this.view.showFieldError(this.view.passwordInput, 'Password minimal 8 karakter');
      valid = false;
    }
    if (!valid) return;

    // 2. Loading
    this.view.setLoading(true);

    try {
      const res = await AuthAPI.register({ name, email, password });
      if (res.error) throw new Error(res.message);

      // jika register sekaligus login mengembalikan token
      const token = res.loginResult?.token;
      if (token) {
        localStorage.setItem('authToken', token);
        window.dispatchEvent(new Event('auth-change'));
      }

      this.view.redirectToHome();
    } catch (err) {
      this._handleError(err);
    } finally {
      this.view.setLoading(false);
    }
  }

  _validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  _handleError(error) {
    const msg = error.message.toLowerCase().includes('email')
      ? 'Email sudah terdaftar'
      : error.message.toLowerCase().includes('network')
        ? 'Gagal terhubung ke server'
        : error.message;
    // tampilkan di email jika email-related, else alert
    if (msg === 'email sudah terdaftar') {
      this.view.showFieldError(this.view.emailInput, msg);
    } else {
      this.view.showAlert(msg);
    }
  }
}
