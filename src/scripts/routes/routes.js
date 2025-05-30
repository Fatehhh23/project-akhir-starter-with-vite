// src/scripts/routes/routes.js

import HomeView from '../pages/home/home-view.js';
import HomePresenter from '../pages/home/home-presenter.js';
import FavoritesView from '../pages/favorites/favorites-view.js';
import FavoritesPresenter from '../pages/favorites/favorites-presenter.js';
import AboutPage from '../pages/about/about-page.js';
import AddStoryView from '../pages/add-story/add-story-view.js';
import AddStoryPresenter from '../pages/add-story/add-story-presenter.js';
import LoginView from '../pages/auth/login-view.js';
import LoginPresenter from '../pages/auth/login-presenter.js';
import RegisterView from '../pages/auth/register-view.js';
import RegisterPresenter from '../pages/auth/register-presenter.js';

// instantiate Home
const homeView      = new HomeView();
const homePresenter = new HomePresenter(homeView);
homeView.presenter = homePresenter;

// instantiate Favorites
const favoritesView      = new FavoritesView();
const favoritesPresenter = new FavoritesPresenter(favoritesView);
favoritesView.presenter = favoritesPresenter;

// instantiate AboutPage
const aboutPage = new AboutPage();

// instantiate Add Story
const addStoryView      = new AddStoryView();
const addStoryPresenter = new AddStoryPresenter(addStoryView);
addStoryView.presenter = addStoryPresenter;

// instantiate Login
const loginView      = new LoginView();
const loginPresenter = new LoginPresenter(loginView);
loginView.presenter = loginPresenter;

// instantiate Register
const registerView      = new RegisterView();
const registerPresenter = new RegisterPresenter(registerView);
registerView.presenter = registerPresenter;

export default {
  '/': {
    async render() {
      return await homeView.render();
    },
    async afterRender() {
      await homeView.afterRender();
      homePresenter.toggleFab();
    },
  },
  '/favorites': {
    async render() {
      return await favoritesView.render();
    },
    async afterRender() {
      await favoritesView.afterRender();
      // jika perlu ada toggle atau init khusus, panggil di sini:
      // favoritesPresenter.init();
    },
  },
  '/about': {
    async render() {
      return await aboutPage.render();
    },
    async afterRender() {
      await aboutPage.afterRender();
    },
  },
  '/add-story': {
    async render() {
      return await addStoryView.render();
    },
    async afterRender() {
      await addStoryView.afterRender();
    },
  },
  '/login': {
    async render() {
      return await loginView.render();
    },
    async afterRender() {
      await loginView.afterRender();
    },
  },
  '/register': {
    async render() {
      return await registerView.render();
    },
    async afterRender() {
      await registerView.afterRender();
    },
  },
};
