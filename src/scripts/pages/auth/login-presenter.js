// src/scripts/views/LoginPresenter.js
import { AuthAPI } from '../../data/api';

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async onLoginSubmitted({ email, password }) {
    // 1. Validasi di presenter
    if (!this._validateEmail(email)) {
      return this.view.showFieldError(this.view.emailInput, 'Format email tidak valid');
    }
    if (password.length < 8) {
      return this.view.showFieldError(this.view.passwordInput, 'Password minimal 8 karakter');
    }

    // 2. Tampilkan loading
    this.view.setLoading(true);

    try {
      // AuthAPI.login() akan fetch, handleResponse, dan setToken ke localStorage
      await AuthAPI.login({ email, password });

      // trigger global auth-change, lalu redirect
      window.dispatchEvent(new Event('auth-change'));
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
    const msg = error.message.includes('401')
      ? 'Email atau password salah'
      : error.message.toLowerCase().includes('network')
        ? 'Gagal terhubung ke server'
        : error.message;
    // tampilkan di kedua field agar user tahu
    this.view.showFieldError(this.view.emailInput, msg);
  }
}
