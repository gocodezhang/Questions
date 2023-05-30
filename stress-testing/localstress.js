const http = require('k6/http');

const url = 'http://localhost:3000';
const maxProductId = 1000011;
const minProductId = Math.ceil(maxProductId * 0.9);
function getRandomINT(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const options = {
  vus: 1,
  duration: '15s',
};

export default function () {
  const endpoint = '/qa/questions';
  const id = getRandomINT(minProductId, maxProductId);
  http.get(`${url + endpoint}?product_id=${id}`);
}
