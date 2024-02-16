const { getQuestions, getEvaluation, app } = require('./server');
const request = require('supertest');
//test may take a while to run due to the async nature of the functions and the api being called, leading to testing errors. prefer to run the test individually to avoid this issue.

//jest won't exit due to server being open, so we need to close the server after the tests are done


//get the questions and evaluation
let questions;
let evaluation;
beforeAll(async () => {
    questions = await getQuestions('javaScript', 'novice', 5, 'master oogway');
    evaluation = await getEvaluation('What is JavaScript?', 'JavaScript is a programming language');
});

// Test the getQuestions function
test('getQuestions to hava an array ', () => {
    expect(questions).toBeDefined();
    expect(questions.Questions).toHaveLength(5);
});

// Test the getEvaluation function
test('getEvaluation to showcase evaluation, explanation, and grade', () => {
    expect(evaluation).toBeDefined();
    expect(evaluation).toHaveProperty('evaluation');
    expect(evaluation).toHaveProperty('explanation');
    expect(evaluation).toHaveProperty('grade');
})

//test correct evaluation 
test('getEvaluation to have correct evaluation', () => {
    expect(evaluation.evaluation).toBe('correct');
    expect(evaluation.grade).toBe('3/3');
    expect(evaluation.explanation).toBeTruthy();
})

//test if server is running correctly 
test('server to be running', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello LRNR!');
})

//test if evaluation route is running correctly
test('evaluation route to be running', async () => {
    const response = await request(app).get('/evaluation?question=In your journey of coding enlightenment, what does DOM stand for in the realm of javascript&submission=Document Object Model');
    expect(response.status).toBe(200);
    expect(response).toBeDefined();
    expect(response.body).toHaveProperty('evaluation');
    expect(response.body).toHaveProperty('explanation');
    expect(response.body).toHaveProperty('grade');
    expect(response.body.evaluation).toBe('correct');
    expect(response.body.grade).toBe('3/3');

})

//test if questions route is running correctly
test('questions route to be running', async () => {
    const response = await request(app).get('/questions?topic=javaScript&expertise=intermediate&numQuestions=10&style=master oogway');
    expect(response.status).toBe(200);
    expect(response).toBeDefined();
    expect(response.body).toHaveProperty('Questions');
    expect(response.body.Questions).toHaveLength(10);
})

//test error messages from evaluation function 
jest.mock('./server', () => ({
    getEvaluation: jest.fn(() => {
        return {
            error: 'Invalid response from GPT. Please try again.',
        };
    }),
    getQuestions: jest.fn(() => {
        return {
            error: 'Invalid response from GPT. Please try again.',
        };
    }),
}));
test('getEvaluation function gives error if api gives invalid response', async () => {

    const response = await getEvaluation('What is JavaScript?', 'JavaScript is a programming language');
    expect(response).toEqual({
        error: 'Invalid response from GPT. Please try again.',
    })
}
);

// test error messages from questions function

test('getQuestions function gives error if api gives invalid response', async () => {
    const response = await getQuestions('aws', 'novice', 5, 'master oogway');
    expect(response).toEqual({
        error: 'Invalid response from GPT. Please try again.',
    })
});