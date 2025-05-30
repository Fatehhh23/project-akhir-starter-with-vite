// Model (src/models/DataModel.js)
export class DataModel {
  constructor() {
    this.data = [];
  }

  addData(newData) {
    this.data = [...this.data, newData];
    return this.data;
  }
}