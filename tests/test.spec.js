const assert = require('assert');
const _ = require('lodash');
const API = require('../app');

describe('Тестирование JSON сервиса...', async () => {
  const api = new API();

  let userId = getRandomIntegerValueFromRange(0, 10);

  it('Получение списка всех пользователей...', async () => {
    const answer = await api.getAllUsers();
    console.log(`Получено пользователей: ${answer.length}`);
  });

  it('Получение пользователя по идентификатору...', async () => {
    const answer = await api.getUserByID(userId);
    console.log(`Получен пользователь: ${answer.name}`);
  });

  it('Получение всех постов...', async () => {
    const answer = await api.getAllPosts();
    console.log(`Количество постов: ${answer.length}`);
  });

  it('Получение всех заданий...', async () => {
    const answer = await api.getAllTodos();
    console.log(`Количество заданий: ${answer.length}`);
  });

  it('Получение всех постов пользователя...', async () => {
    const answer = await api.getAllPostsOfUser(userId);
    console.log(`Количество постов пользователя: ${answer.length}`);
  });

  it('Получение всех заданий пользователя...', async () => {
    const answer = await api.getAllTodosOfUser(userId);
    console.log(`Количество заданий пользователя: ${answer.length}`);
  });

  it('Параметризированный запрос информации...', async () => {
    const answer = await api.getInfoWithParams({
      id: userId,
      with: ['posts', 'todos']
    });
    console.log(`${JSON.stringify(answer)}`);
  });
});

function getRandomIntegerValueFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
