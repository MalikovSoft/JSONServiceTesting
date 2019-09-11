const assert = require('assert');
const _ = require('lodash');
const API = require('../app');

describe('Тестирование JSON сервиса...', async () => {
  const api = new API();

  let userId = getRandomIntegerValueFromRange(0, 10);

  it('Получение списка всех пользователей...', async () => {
    const answer = await api.getAllUsers();
    assert(answer.length > 0);
  });

  it('Получение пользователя по идентификатору...', async () => {
    const answer = await api.getUserByID(userId);
  });

  it('Получение пользователя по неверному идентификатору...', async () => {
    assert.rejects(
      async () => {
        await api.getUserByID(-1);
      },
      { name: 'Error' }
    );
  });

  it('Получение всех постов...', async () => {
    const answer = await api.getAllPosts();
  });

  it('Получение всех заданий...', async () => {
    const answer = await api.getAllTodos();
  });

  it('Получение всех постов пользователя...', async () => {
    const answer = await api.getAllPostsOfUser(userId);
  });

  it('Получение всех заданий пользователя...', async () => {
    const answer = await api.getAllTodosOfUser(userId);
  });

  it('Параметризированный запрос информации... с заданием пользователя + posts + todos', async () => {
    const answer = await api.getInfoWithParams({
      id: userId,
      with: ['posts', 'todos']
    });
  });

  it('Параметризированный запрос информации... с заданием пользователя + posts', async () => {
    const answer = await api.getInfoWithParams({
      id: userId,
      with: ['posts']
    });
  });

  it('Параметризированный запрос информации... с заданием пользователя + todos', async () => {
    const answer = await api.getInfoWithParams({
      id: userId,
      with: ['todos']
    });
  });

  it('Параметризированный запрос информации... без задания пользователя', async () => {
    const answer = await api.getInfoWithParams({
      with: ['posts', 'todos']
    });
  });

  it('Параметризированный запрос информации... без задания пользователя + posts + todos', async () => {
    const answer = await api.getInfoWithParams({
      with: ['posts', 'todos']
    });
  });

  it('Параметризированный запрос информации... без задания пользователя + posts', async () => {
    const answer = await api.getInfoWithParams({
      with: ['posts']
    });
  });

  it('Параметризированный запрос информации... без задания пользователя + todos', async () => {
    const answer = await api.getInfoWithParams({
      with: ['todos']
    });
  });
});

function getRandomIntegerValueFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
