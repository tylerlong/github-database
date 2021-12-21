import {Octokit} from '@octokit/core';
import {restEndpointMethods} from '@octokit/plugin-rest-endpoint-methods';

const MyOctokit = Octokit.plugin(restEndpointMethods);
const octokit = new MyOctokit({auth: process.env.GH_TOKEN});

const owner = 'tylerlong';
const repo = 'github-database';

const main = async () => {
  const r = await octokit.rest.repos.listReleases({owner, repo});
  const release = r.data.filter(item => item.name === 'default')[0];
  console.log(JSON.stringify(release, null, 2));

  const r2 = await octokit.rest.repos.uploadReleaseAsset({
    owner,
    repo,
    release_id: release.id,
    name: 'hello.txt',
    data: 'world',
  });
  console.log(JSON.stringify(r2, null, 2));
};

main();
