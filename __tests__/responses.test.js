const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Thread = require('../lib/models/Thread');
const Response = require('../lib/models/Response');

describe('amazine routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  

  it('creates a response via POST', async() => {
    const newThread = await Thread.insert({
      title: 'this is an interview',
      author: 'Smarty Pants',
      flair: 'stuff and things',
      upvotes: 6,
      downvotes: 4,
      image: 'test1.png'
    });
    const newResponse = await Response.insert({
      qAndA: [{
        question: 'here is a question about things you know about!', 
        answer: 'here are words about the things I asked about!'
      }],
      threadId: newThread.id
    });

    return request(app)
      .post('/api/v1/responses')
      .send(
        newResponse
      )
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          qAndA: [{
            question: 'here is a question about things you know about!', 
            answer: 'here are words about the things I asked about!'
          }],
          threadId: '1'
        });
      });
  });

  it('returns all responses via GET', async() => {
    await Thread.insert({
      title: 'this is an interview',
      author: 'Smarty Pants',
      flair: 'stuff and things',
      upvotes: 6,
      downvotes: 4,
      image: 'test1.png'
    });
    await Promise.all([
      Response.insert({ 
        qAndA: [{
          question: 'here is a question about things you know about!', 
          answer: 'here are words about the things I asked about!'
        }],
        threadId: 1
      }),
      Response.insert({ 
        qAndA: [{
          question: 'here are words?', 
          answer: 'I agree, those are words!'
        }],
        threadId: 1
      }),
    ]);

    return request(app)
      .get('/api/v1/responses')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([
          { 
            id: '1',
            qAndA: [{
              question: 'here is a question about things you know about!', 
              answer: 'here are words about the things I asked about!'
            }],
            threadId: expect.any(String)
          },
          { 
            id: '2',
            qAndA: [{
              question: 'here are words?', 
              answer: 'I agree, those are words!'
            }],
            threadId: expect.any(String)
          }
        ]));
      });
  });
});

