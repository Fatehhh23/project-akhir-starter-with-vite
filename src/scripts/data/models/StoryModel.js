// models/StoryModel.js
export class StoryModel {
  static async addStory(formData) {
    const response = await fetch('https://api.example.com/stories', {
      method: 'POST',
      body: formData,
    });
    return response.json();
  }
}