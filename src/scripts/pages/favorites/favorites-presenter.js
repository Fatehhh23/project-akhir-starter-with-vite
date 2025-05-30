// src/scripts/pages/favorites/favorites-presenter.js

import { getAllItems, deleteItem } from '../../../db.js';

export default class FavoritesPresenter {
  constructor(view) {
    this.view = view;
    this.view.presenter = this;
  }

  async getFavorites() {
    return await getAllItems();
  }

  async deleteFavorite(id) {
    await deleteItem(id);
    await this._refreshView();
  }

  handleDelete(id) {
    this.deleteFavorite(id);
  }

  async _refreshView() {
    const html = await this.view.render();
    document.getElementById('main-content').innerHTML = html;
    this.view.afterRender();
  }
}
