import axios from 'axios';
// import {Octokit} from '@octokit/core';
import {
  // restEndpointMethods,
  RestEndpointMethodTypes,
} from '@octokit/plugin-rest-endpoint-methods';

const client = axios.create({
  baseURL: 'https://api.github.com/',
});

// const MyOctokit = Octokit.plugin(restEndpointMethods);
// const octokit = new MyOctokit();

const main = async () => {
  const r = (await client.get(
    '/repos/tylerlong/github-database/releases'
  )) as RestEndpointMethodTypes['repos']['listReleases']['response'];
  const data = r.data;
  const release = data.filter(item => item.name === 'default')[0];
  console.log(JSON.stringify(release, null, 2));

  // const r = await octokit.rest.repos.listReleases({
  //   owner: 'tylerlong',
  //   repo: 'github-database',
  // });
};

main();
