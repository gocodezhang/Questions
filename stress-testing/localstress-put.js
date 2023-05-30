const http = require('k6/http');

const url = 'http://localhost:3000';

const maxAnswerId = 6879307;
const minAnswerId = Math.ceil(maxAnswerId * 0.9);

function getRandomINT(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const options = {
  scenarios: {
    stress_scenario: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '60s', target: 1000 },
        { duration: '2m', target: 1000 },
      ],
      gracefulRampDown: '60s'
    },
    // stress_scenario: {
    //     executor: 'ramping-arrival-rate',
    //     startRate: 0,
    //     timeUnit: '1s',
    //     preAllocatedVUs: 300,
    //     stages: [
    //       { duration: '60s', target: 1000 },
    //       { duration: '2m', target: 1000 },
    //       { duration: '60s', target: 0 },
    //     ],
    //   },
  },
};

export default function () {
  const randomAnswerId = getRandomINT(minAnswerId, maxAnswerId);
  const endpoint = `/qa/answers/${randomAnswerId}/helpful`;
  // const req1 = {
  //   method: 'PUT',
  //   url: `${url + endpoint}`,
  //   params: {
  //     tags: { name: 'MarkAnswersURL' }
  //   },
  // }

  http.put(http.url`${url + endpoint}`);

}