const path = 'http://localhost:3030/';

function getData(api) {
  return fetch(`${path}${api}`).then(data => data.json());
}

export { getData };
