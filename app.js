const axios = require('axios');
const _ = require('lodash');

class API {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 5000
    });
  }

  async getAllUsers() {
    const users = await this.axios.get('/users');
    return users.data;
  }

  async getUserByID(userId) {
    const user = await this.axios.get(`/users/${userId}`);
    return user.data;
  }

  async getAllPosts() {
    const posts = await this.axios.get('/posts');
    return posts.data;
  }

  async getAllTodos() {
    const todos = await this.axios.get('/todos');
    return todos.data;
  }

  async getAllPostsOfUser(userId) {
    const posts = await this.axios.get(`/posts?userId=${userId}`);
    return posts.data;
  }

  async getAllTodosOfUser(userId) {
    const todos = await this.axios.get(`/todos?userId=${userId}`);
    return todos.data;
  }

  async getInfoWithParams(params) {
    let result = {};
    if (params.id) {
      result.user = await this.getUserByID(params.id);
      params.with.forEach(element => {
        result[`${element}`] = this.axios.get(
          `/${element}?userId=${result.user.userId}`
        );
      });
    } else {
      params.with.forEach(element => {
        result[`${element}`] = this.axios.get(`/${element}`);
      });
    }
    return result;
  }
}

module.exports = API;
