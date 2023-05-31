/* eslint import/no-unresolved: 0 */
const http = require('k6/http');

const url = 'http://localhost:3000';

const maxProductId = 1000011;
const minProductId = Math.ceil(maxProductId * 0.9);
const maxQuestionId = 3518963;
const minQuestionId = Math.ceil(maxQuestionId * 0.9);

function getRandomINT(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const options = {
  scenarios: {
    stress_scenario: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '45s', target: 300 },
        { duration: '45s', target: 300 },
      ],
    },
  },
};

export default function () {
  const randomQuestionId = getRandomINT(minQuestionId, maxQuestionId);
  const endpointAnswers = `/qa/questions/${randomQuestionId}/answers`;
  const randomProductId = getRandomINT(minProductId, maxProductId);
  const endpointQuestions = '/qa/questions';

  const req1 = {
    method: 'GET',
    url: `${url + endpointQuestions}?product_id=${randomProductId}`,
    params: {
      tags: { name: 'GetQuestionsURL' },
    },
  };

  const req2 = {
    method: 'GET',
    url: `${url + endpointAnswers}`,
    params: {
      tags: { name: 'GetAnswersURL' },
    },
  };

  http.batch([req1, req2]);
}

// duration: '1m',
// rate: 1500,
// timeUnit: '1s',
// preAllocatedVUs: 500,
