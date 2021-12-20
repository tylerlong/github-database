import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.github.com/',
});

const main = async () => {
  const r = await client.get('/zen');
  console.log(r.data);
};

main();
