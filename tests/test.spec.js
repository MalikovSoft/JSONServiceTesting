const assert = require('assert');
const _ = require('lodash');
const API = require('../app');

describe('Тестирование JSON сервиса...', async () => {
  const api = new API();

  let userId = getRandomIntegerValueFromRange(0, 10);

  it('Получение списка всех пользователей...', async () => {
    const answer = await api.getAllUsers();
    assert(answer.length > 0);
  }).timeout(0);

  it('Получение пользователя по идентификатору...', async () => {
    const answer = await api.getUserByID(userId);
  }).timeout(0);

  it('Получение пользователя по неверному идентификатору...', async () => {
    const answer = await api.getUserByID(-1);
    assert.equal(answer.response.status, 404);
  }).timeout(0);

  it('Получение всех постов...', async () => {
    const answer = await api.getAllPosts();
  }).timeout(0);

  it('Получение всех заданий...', async () => {
    const answer = await api.getAllTodos();
  }).timeout(0);

  it('Получение всех постов пользователя...', async () => {
    const answer = await api.getAllPostsOfUser(userId);
  }).timeout(0);

  it('Получение всех заданий пользователя...', async () => {
    const answer = await api.getAllTodosOfUser(userId);
  }).timeout(0);

  it('Параметризированный запрос информации... с заданием пользователя + posts + todos', async () => {
    const answer = await api.getInfoWithParams({
      id: userId,
      with: ['posts', 'todos']
    });
  }).timeout(0);

  it('Параметризированный запрос информации... с заданием пользователя + posts', async () => {
    const answer = await api.getInfoWithParams({
      id: userId,
      with: ['posts']
    });
  }).timeout(0);

  it('Параметризированный запрос информации... с заданием пользователя + todos', async () => {
    const answer = await api.getInfoWithParams({
      id: userId,
      with: ['todos']
    });
  }).timeout(0);

  it('Параметризированный запрос информации... без задания пользователя', async () => {
    const answer = await api.getInfoWithParams({
      with: ['posts', 'todos']
    });
  }).timeout(0);

  it('Параметризированный запрос информации... без задания пользователя + posts + todos', async () => {
    const answer = await api.getInfoWithParams({
      with: ['posts', 'todos']
    });
  }).timeout(0);

  it('Параметризированный запрос информации... без задания пользователя + posts', async () => {
    const answer = await api.getInfoWithParams({
      with: ['posts']
    });
  }).timeout(0);

  it('Параметризированный запрос информации... без задания пользователя + todos', async () => {
    const answer = await api.getInfoWithParams({
      with: ['todos']
    });
  }).timeout(0);
});

function getRandomIntegerValueFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
