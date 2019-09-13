const axios = require('axios');
const assert = require('assert');
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
    try {
      const user = await this.axios.get(`/users/${userId}`);
      if (user.status == 200) {
        return user.data;
      } else {
        return user;
      }
    } catch (error) {
      return error;
    }
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
      for (const elem of params.with) {
        let tmp = await this.axios.get(`/${elem}?userId=${params.id}`);
        result[`${elem}`] = tmp.data;
      }
    } else {
      for (const elem of params.with) {
        let tmp = await this.axios.get(`/${elem}`);
        result[`${elem}`] = tmp.data;
      }
    }
    return result;
  }
}

module.exports = API;
