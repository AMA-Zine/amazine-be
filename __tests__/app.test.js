const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Thread = require('../lib/models/Thread');

describe('amazine routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a thread via POST', () => {
    return request(app)
      .post('/api/v1/threads')
      .send({
        title: 'this is an interview',
        author: 'Smarty Pants',
        flair: 'stuff and things',
        upvotes: 6,
        downvotes: 4,
        image: 'test1.png'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          title: 'this is an interview',
          author: 'Smarty Pants',
          flair: 'stuff and things',
          upvotes: 6,
          downvotes: 4,
          image: 'test1.png'
        });
      });
  });

  it('returns all threads via GET', async() => {
    const threads = await Promise.all([
      Thread.insert({ title: 'this is an interview', author: 'Smarty Pants', flair: 'stuff and things', upvotes: 6, downvotes: 4, image: 'test1.png' }),
      Thread.insert({ title: 'this is an interview', author: 'Smarty', flair: 'stuff', upvotes: 20, downvotes: 6, image: 'test2.png' }),
      Thread.insert({ title: 'this is an interview', author: 'Pants', flair: 'things', upvotes: 8, downvotes: 12, image: 'test3.png' })
    ]);
    return request(app)
      .get('/api/v1/threads')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining(threads));
      });
  });
});
