/* eslint import/no-unresolved: 0 */
const http = require('k6/http');

const url = 'http://localhost:3000';

const maxProductId = 1000011;
const minProductId = Math.ceil(maxProductId * 0.9);

function getRandomINT(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const options = {
  scenarios: {
    stress_scenario: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 1000 },
        { duration: '15s', target: 1000 },
      ],
    },
  },
};

export default function () {
  const endpoint = '/qa/questions';
  const randomProductId = getRandomINT(minProductId, maxProductId);
  const body = {
    product_id: randomProductId,
    body: 'testing again',
    name: 'jayz',
    email: 'jayz123@gmail.com',
  };
  http.post(`${url + endpoint}`, body);
}
