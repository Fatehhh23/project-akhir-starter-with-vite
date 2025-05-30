export const AuthService = {
  getToken() {
    return localStorage.getItem('authToken');
  },
  isAuthenticated() {
    return Boolean(this.getToken());
  },
  logout() {
    localStorage.removeItem('authToken');
    window.dispatchEvent(new Event('auth-change'));
    window.location.hash = '#/login';
  }
};
